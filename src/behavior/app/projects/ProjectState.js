/*
 * @flow
 */

import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import build from 'redux-object';
import type { AppState } from '../types';
import type { ApiErrors, HttpQuery } from '../api/types';
import {
  CREATE_ENTITY_STARTED,
  CREATE_ENTITY_SUCCEEDED,
  CREATE_ENTITY_FAILED,
  READ_ENTITIES_STARTED,
  READ_ENTITIES_SUCCEEDED,
  READ_ENTITIES_FAILED,
  READ_ENTITY_STARTED,
  READ_ENTITY_SUCCEEDED,
  READ_ENTITY_FAILED,
  UPDATE_ENTITY_STARTED,
  UPDATE_ENTITY_SUCCEEDED,
  UPDATE_ENTITY_FAILED,
  DELETE_ENTITY_STARTED,
  DELETE_ENTITY_SUCCEEDED,
  DELETE_ENTITY_FAILED,
  CLEAR_DATABASE,
  UPDATE_DATABASE,
} from './types';

import type {
  Action,
  Database,
  DatabaseReducer,
  Entity,
  ErrorReducer,
  CachedQueries,
  CachedQueriesReducer,
  CachedQuery,
  CachedQueryWithEntities,
  GetEntitiesByQuerySelector,
  GetEntityByIdSelector,
  GetErrorSelector,
  GetIsConnectingSelector,
  HasEntitySelector,
  IsConnectingReducer,
} from './types';

export const database: DatabaseReducer = (
  state: Database = {},
  action: Action,
): Database => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge({ ...state }, action.payload);

    case CLEAR_DATABASE:
      return {};

    default:
      return state;
  }
};

const cachedQueries: CachedQueriesReducer = (
  state: CachedQueries = {},
  action: Action,
): CachedQueries => {
  switch (action.type) {
    case READ_ENTITIES_SUCCEEDED: {
      const query: HttpQuery = action.payload.query;

      const data: Array<Entity> = action.payload.response.data || [];

      return {
        ...state,
        [JSON.stringify(query)]: {
          ids: data.map((entity: Entity): string => entity.id),
          response: {
            links: action.payload.response.links,
            meta: action.payload.response.meta,
            query,
          },
        },
      };
    }

    case CLEAR_DATABASE:
      return {};

    default:
      return state;
  }
};

const error: ErrorReducer = (state: ApiErrors = null, action: Action): ApiErrors => {
  switch (action.type) {
    case CREATE_ENTITY_FAILED:
    case DELETE_ENTITY_FAILED:
    case READ_ENTITIES_FAILED:
    case READ_ENTITY_FAILED:
    case UPDATE_ENTITY_FAILED:
      return action.payload || null;

    case CREATE_ENTITY_STARTED:
    case CREATE_ENTITY_SUCCEEDED:
    case DELETE_ENTITY_STARTED:
    case DELETE_ENTITY_SUCCEEDED:
    case READ_ENTITIES_STARTED:
    case READ_ENTITIES_SUCCEEDED:
    case READ_ENTITY_STARTED:
    case READ_ENTITY_SUCCEEDED:
    case UPDATE_ENTITY_STARTED:
    case UPDATE_ENTITY_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

const isConnecting: IsConnectingReducer = (
  state: boolean = false,
  action: Action,
): boolean => {
  switch (action.type) {
    case CREATE_ENTITY_SUCCEEDED:
    case CREATE_ENTITY_FAILED:
    case DELETE_ENTITY_SUCCEEDED:
    case DELETE_ENTITY_FAILED:
    case READ_ENTITIES_SUCCEEDED:
    case READ_ENTITIES_FAILED:
    case READ_ENTITY_SUCCEEDED:
    case READ_ENTITY_FAILED:
    case UPDATE_ENTITY_SUCCEEDED:
    case UPDATE_ENTITY_FAILED:
      return false;

    case CREATE_ENTITY_STARTED:
    case DELETE_ENTITY_STARTED:
    case READ_ENTITIES_STARTED:
    case READ_ENTITY_STARTED:
    case UPDATE_ENTITY_STARTED:
      return true;

    default:
      return state;
  }
};

export const getEntityById: GetEntityByIdSelector = (
  state: AppState,
  id: string,
): Entity => {
  if (!id) throw new Error('Argument <id> must not be null.');

  const opts: { eager: boolean, ignoreLinks: boolean } = { eager: true, ignoreLinks: true };
  const entity: Entity = build(state.database, 'projects', id, opts);
  if (!entity) {
    const notFoundError: string = `Entity not found for id: ${id}.` +
      ' hasEntity() function should be called before calling this function' +
      ' to avoid this error.';

    throw new Error(notFoundError);
  }

  return entity;
};

export const hasEntity: HasEntitySelector = (state: AppState, id: string): boolean => {
  try {
    getEntityById(state, id);
    return true;
  } catch (e) {
    return false;
  }
};

export const getEntitiesByQuery: GetEntitiesByQuerySelector = (
  state: AppState,
  query: HttpQuery,
): CachedQueryWithEntities | void => {
  if (!state.projects) return undefined;

  const cachedQuery: CachedQuery = state.projects.cachedQueries[JSON.stringify(query)];
  if (!cachedQuery) return undefined;

  return {
    entities: cachedQuery.ids.map((id: string): Entity => getEntityById(state, id)),
    cachedQuery,
  };
};

export const getError: GetErrorSelector = (state: AppState): ApiErrors | null => (
  state.projects.error
);

export const getIsConnecting: GetIsConnectingSelector = (state: AppState): boolean => (
  state.projects.isConnecting
);

export default combineReducers({
  error,
  cachedQueries,
  isConnecting,
});
