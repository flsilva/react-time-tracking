/*
 * @flow
 */

import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import type { ArrayReducer } from '../../../types';
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
  Collection,
  Database,
  DatabaseReducer,
  Entity,
  ErrorReducer,
  CachedCollectionQueries,
  CachedCollectionQueriesReducer,
  CachedCollectionQuery,
  CachedUnitQueries,
  CachedUnitQueriesReducer,
  CachedUnitQuery,
  GetErrorSelector,
  GetIsConnectingSelector,
  HasCollectionSelector,
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

const cachedCollectionQueries: CachedCollectionQueriesReducer = (
  state: CachedCollectionQueries = {},
  action: Action,
): CachedCollectionQueries => {
  switch (action.type) {
    case READ_COLLECTION_SUCCEEDED: {
      const query: HttpQuery = action.payload.query;
      const data: Collection = action.payload.response.data || [];

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

function createCachedUnitQuery(query: HttpQuery, entity: Entity): CachedUnitQuery {
  return {
    id: entity.id,
    query,
  };
}

function collectionToUnitQueriesReducerFactory(
  query: HttpQuery,
): ArrayReducer<CachedUnitQueries, Entity> {
  return function collectionToUnitQueriesReducer(
    acc: CachedUnitQueries,
    value: Entity,
  ): CachedUnitQueries {
    const queryWithId:HttpQuery = generateQueryForResourceId(
      value.id,
    )(omit(query, 'collection'));

    return {
      ...acc,
      [JSON.stringify(queryWithId)]: createCachedUnitQuery(queryWithId, value),
    };
  };
}

const cachedUnitQueries: CachedUnitQueriesReducer = (
  state: CachedUnitQueries = {},
  action: Action,
): CachedUnitQueries => {
  switch (action.type) {
    case READ_ENTITY_SUCCEEDED: {
      const query: HttpQuery = action.payload.query;
      const entity: Entity | void = action.payload.response.data;

      if (!entity) return state;

      return {
        ...state,
        [JSON.stringify(query)]: createCachedUnitQuery(query, entity),
      };
    }

    case READ_COLLECTION_SUCCEEDED: {
      const query: HttpQuery = action.payload.query;
      const collection: Collection | void = action.payload.response.data;

      if (!collection || isEmpty(collection)) return state;

      return collection.reduce(collectionToUnitQueriesReducerFactory(query), state);
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

export const hasCollection: HasCollectionSelector = (
  state: AppState,
  query: HttpQuery,
): boolean => {
  const cachedQuery: CachedCollectionQuery = state.projects.cachedCollectionQueries[
    JSON.stringify(query)
  ];

  return cachedQuery !== undefined;
};

export const hasEntity: HasEntitySelector = (state: AppState, query: HttpQuery): boolean => {
  const cachedQuery: CachedUnitQuery = state.projects.cachedUnitQueries[
    JSON.stringify(query)
  ];

  return cachedQuery !== undefined;
};

export const getError: GetErrorSelector = (state: AppState): ApiErrors | null => (
  state.projects.error
);

export const getIsConnecting: GetIsConnectingSelector = (state: AppState): boolean => (
  state.projects.isConnecting
);

export default combineReducers({
  error,
  cachedCollectionQueries,
  cachedUnitQueries,
  isConnecting,
});
