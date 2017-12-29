/*
 * @flow
 */

import normalize from 'json-api-normalizer';
import build from 'redux-object';
import { database as projectDatabaseReducer } from './projects/ProjectState';
import { UPDATE_DATABASE as UPDATE_PROJECTS_DATABASE } from './projects/types';
import { entities as timeLogEntitiesReducer } from './time-logs/TimeLogState';
import { UPDATE_DATABASE as UPDATE_TIME_LOGS_DATABASE } from './time-logs/TimeLogActions';
import { entities as userEntitiesReducer } from './users/UserState';
import { UPDATE_DATABASE as UPDATE_USERS_DATABASE } from './users/UserActions';
import { entities as stopwatchEntitiesReducer } from './stopwatches/StopwatchState';
// import { UPDATE_DATABASE as UPDATE_STOPWATCHES_DATABASE } from './stopwatch/StopwatchActions';
import { generateQueryForResourceId } from './utils/QueryUtils';
import type { HttpQuery } from './api/types';
import type {
  AppState,
  Collection,
  Entity,
  CachedCollectionQuery,
  CollectionWithQuery,
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
    reducer: projectDatabaseReducer,
    updateDbAction: UPDATE_PROJECTS_DATABASE,
  },
  stopwatches: {
    reducer: stopwatchEntitiesReducer,
    updateDbAction: UPDATE_STOPWATCHES_DATABASE,
  },
  timeLogs: {
    reducer: timeLogEntitiesReducer,
    updateDbAction: UPDATE_TIME_LOGS_DATABASE,
  },
  users: {
    reducer: userEntitiesReducer,
    updateDbAction: UPDATE_USERS_DATABASE,
  },
};

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROJECTS_DATABASE:
    case UPDATE_STOPWATCHES_DATABASE:
    case UPDATE_TIME_LOGS_DATABASE:
    case UPDATE_USERS_DATABASE: {
      console.log('DatabaseState() - action.payload: ', action.payload);
      const normalizedData = normalize(action.payload);
      console.log('DatabaseState() - normalizedData: ', normalizedData);

      // reconsider if it wouldn't be better to have this static:
      // return {
      //   ...state,
      //   ...{
      //     projects: projectEntitiesReducer(state.projects, normalizedData.projects),
      //     users: userEntitiesReducer(state.users, normalizedData.users),
      //   }
      // }
      return Object.keys(normalizedData)
        .filter(entityType => entityReducers[entityType])
        .reduce((database, entityType) => ({
          ...state,
          ...database,
          ...{
            [entityType]:
              entityReducers[entityType].reducer(state[entityType], {
                type: entityReducers[entityType].updateDbAction,
                payload: normalizedData[entityType],
              }),
          },
        }), {});
    }

    /*
    case CLEAR_DATABASE:
      return {};
    */

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
  ): CollectionWithQuery | void {
    if (!state[entityType]) return undefined;

    const cachedQuery: CachedCollectionQuery = state[entityType].cachedCollectionQueries[
      JSON.stringify(query)
    ];

    if (!cachedQuery) return undefined;

    const entities: Collection = [];

    cachedQuery.ids.forEach((id: string): Entity | void => {
      const entity: Entity | void = getEntityFactory(entityType)(
        state,
        generateQueryForResourceId(id)(cachedQuery.query),
      );

      if (entity !== undefined) entities.push(entity);
    });

    return {
      entities,
      cachedQuery,
    };
  }
);
