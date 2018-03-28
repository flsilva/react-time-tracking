/*
 * @flow
 */

import normalize from 'json-api-normalizer';
import build from 'redux-object';
import type { ArrayReducer } from '../../types';
import { database as projectsReducer } from './projects/ProjectState';
import {
  CLEAR_DATABASE as CLEAR_PROJECTS_DATABASE,
  UPDATE_DATABASE as UPDATE_PROJECTS_DATABASE,
} from './projects/types';
import { entities as timeLogsReducer } from './time-logs/TimeLogState';
import { UPDATE_DATABASE as UPDATE_TIME_LOGS_DATABASE } from './time-logs/TimeLogActions';
import { entities as usersReducer } from './users/UserState';
import { UPDATE_DATABASE as UPDATE_USERS_DATABASE } from './users/UserActions';
import { entities as stopwatchesReducer } from './stopwatches/StopwatchState';
// import { UPDATE_DATABASE as UPDATE_STOPWATCHES_DATABASE } from './stopwatch/StopwatchActions';
import { generateQueryForResourceId } from './utils/QueryUtils';
import type { HttpQuery } from './api/types';
import type { QueryMetaResult } from './api/caching/types';
import { getQueryMetaResult } from './api/caching/Repository';
import type {
  AppState,
  DatabaseAction,
  DatabaseState,
  Collection,
  Entity,
  CollectionWithQueryMetaResult,
  GetCollectionSelector,
  GetCollectionSelectorFactory,
  GetEntitySelector,
  GetEntitySelectorFactory,
} from './types';

/*
 * TODO: fix weird bug: commented out line above:
 * import { UPDATE_DATABASE as UPDATE_STOPWATCHES_DATABASE } from ...
 * It's not working, it returns undefined as variable value.
 * If I rename StopwatchActions.js file to StopwatchActions2.js
 * and import it from there it does work. Needs more investigation.
 * Keeping this ugly hack for now.
 */
const UPDATE_STOPWATCHES_DATABASE: 'app/stopwatches/update/database' =
  'app/stopwatches/update/database';
/**/

const entityReducers = {
  projects: {
    reducer: projectsReducer,
    updateDbAction: UPDATE_PROJECTS_DATABASE,
  },
  stopwatches: {
    reducer: stopwatchesReducer,
    updateDbAction: UPDATE_STOPWATCHES_DATABASE,
  },
  timeLogs: {
    reducer: timeLogsReducer,
    updateDbAction: UPDATE_TIME_LOGS_DATABASE,
  },
  users: {
    reducer: usersReducer,
    updateDbAction: UPDATE_USERS_DATABASE,
  },
};

function createDatabaseStateReducer(
  updatedDB: DatabaseState,
): ArrayReducer<DatabaseState, string> {
  return function databaseStateReducer(acc: DatabaseState, entityType: string): DatabaseState {
    return {
      ...acc,
      ...{
        [entityType]:
          entityReducers[entityType].reducer(acc[entityType], {
            type: entityReducers[entityType].updateDbAction,
            payload: updatedDB[entityType],
          }),
      },
    };
  };
}

export default (state: DatabaseState = {}, action: DatabaseAction): DatabaseState => {
  switch (action.type) {
    case UPDATE_PROJECTS_DATABASE: {
      // case UPDATE_STOPWATCHES_DATABASE:
      // case UPDATE_TIME_LOGS_DATABASE:
      // case UPDATE_USERS_DATABASE: {
      console.log('DatabaseState() - action.payload: ', action.payload);
      const updatedDB: DatabaseState = normalize(action.payload);
      console.log('DatabaseState() - updatedDB: ', updatedDB);

      return Object.keys(updatedDB)
        .filter((entityType: string): boolean => entityReducers[entityType] !== undefined)
        .reduce(createDatabaseStateReducer(updatedDB), state);
    }

    case CLEAR_PROJECTS_DATABASE:
      return {
        ...state,
        projects: undefined,
      };

    default:
      return state;
  }
};

export const getEntityFactory: GetEntitySelectorFactory = (
  entityType: string,
): GetEntitySelector => (
  function getEntity(state: AppState, query: HttpQuery): Entity | void {
    if (!query) throw new Error('Argument <query> must not be null.');
    if (!query.unit) throw new Error('Argument <query.unit> must not be null.');

    const id: string | void = query.unit.id;
    if (!id) throw new Error('Argument <query.unit.id> must not be null.');

    const opts: { eager: boolean, ignoreLinks: boolean } = {
      eager: true,
      ignoreLinks: true,
    };

    const entity: Entity = build(state.database, entityType, id, opts);
    if (entity === null) return undefined;

    return entity;
  }
);

export const getCollectionFactory: GetCollectionSelectorFactory = (
  entityType: string,
): GetCollectionSelector => (
  function getCollection(
    state: AppState,
    query: HttpQuery,
  ): CollectionWithQueryMetaResult | void {
    if (!state[entityType]) return undefined;

    const queryMetaResult: QueryMetaResult | void = getQueryMetaResult(state, query);
    if (!queryMetaResult) return undefined;

    const entities: Collection = [];

    queryMetaResult.ids.forEach((id: string): Entity | void => {
      const entity: Entity | void = getEntityFactory(entityType)(
        state,
        generateQueryForResourceId(id)(queryMetaResult.query),
      );

      if (entity !== undefined) entities.push(entity);
    });

    return {
      entities,
      queryMetaResult,
    };
  }
);
