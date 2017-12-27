/*
 * @flow
 */

import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import build from 'redux-object';
import type { AppState } from '../types';
import type { ApiErrors, HttpQuery } from '../api/types';
import { generateQueryForResourceId } from '../utils/QueryUtils';
import {
  CREATE_ENTITY_STARTED,
  CREATE_ENTITY_SUCCEEDED,
  CREATE_ENTITY_FAILED,
  READ_COLLECTION_STARTED,
  READ_COLLECTION_SUCCEEDED,
  READ_COLLECTION_FAILED,
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
  CachedCollectionQueries,
  CachedCollectionQueriesReducer,
  CachedCollectionQuery,
  CollectionWithQuery,
  GetCollectionSelector,
  GetEntitySelector,
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

const cachedQueries: CachedCollectionQueriesReducer = (
  state: CachedCollectionQueries = {},
  action: Action,
): CachedCollectionQueries => {
  switch (action.type) {
    case READ_COLLECTION_SUCCEEDED: {
      const query: HttpQuery = action.payload.query;

      const data: Array<Entity> = action.payload.response.data || [];

      return {
        ...state,
        [JSON.stringify(query)]: {
          ids: data.map((entity: Entity): string => entity.id),
          meta: action.payload.response.meta,
          query,
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
    case READ_COLLECTION_FAILED:
    case READ_ENTITY_FAILED:
    case UPDATE_ENTITY_FAILED:
      return action.payload || null;

    case CREATE_ENTITY_STARTED:
    case CREATE_ENTITY_SUCCEEDED:
    case DELETE_ENTITY_STARTED:
    case DELETE_ENTITY_SUCCEEDED:
    case READ_COLLECTION_STARTED:
    case READ_COLLECTION_SUCCEEDED:
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
    case READ_COLLECTION_SUCCEEDED:
    case READ_COLLECTION_FAILED:
    case READ_ENTITY_SUCCEEDED:
    case READ_ENTITY_FAILED:
    case UPDATE_ENTITY_SUCCEEDED:
    case UPDATE_ENTITY_FAILED:
      return false;

    case CREATE_ENTITY_STARTED:
    case DELETE_ENTITY_STARTED:
    case READ_COLLECTION_STARTED:
    case READ_ENTITY_STARTED:
    case UPDATE_ENTITY_STARTED:
      return true;

    default:
      return state;
  }
};

export const getEntity: GetEntitySelector = (
  state: AppState,
  query: HttpQuery,
): Entity => {
  if (!query) throw new Error('Argument <query> must not be null.');
  if (!query.unit) throw new Error('Argument <query.unit> must not be null.');

  const id: string | void = query.unit.id;
  if (!id) throw new Error('Argument <query.unit.id> must not be null.');

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

export const hasEntity: HasEntitySelector = (state: AppState, query: HttpQuery): boolean => {
  try {
    getEntity(state, query);
    return true;
  } catch (e) {
    return false;
  }
};

export const getCollection: GetCollectionSelector = (
  state: AppState,
  query: HttpQuery,
): CollectionWithQuery | void => {
  if (!state.projects) return undefined;

  const cachedQuery: CachedCollectionQuery = state.projects.cachedQueries[
    JSON.stringify(query)
  ];

  if (!cachedQuery) return undefined;

  return {
    entities: cachedQuery.ids.map((id: string): Entity => (
      getEntity(state, generateQueryForResourceId(id)(query))),
    ),
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
