/*
 * @flow
 */

import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import type { ArrayReducer } from '../../../../types';
import type { AppState, Collection, Entity } from '../../types';
import { generateQueryForResourceId } from '../../utils/QueryUtils';
import type { Action, HttpQuery, HttpResponseMeta } from '../types';
import { HTTP_REQUEST_SUCCEEDED } from '../types';

import type {
  GetQueryCacheSelector,
  HasQueryCacheSelector,
  QueryCache,
  QueryCacheMap,
  QueryCacheReducer,
  ResourceTypeMap,
} from './types';
import { CLEAR_CACHE } from './types';

function createQueryCache(
  query: HttpQuery,
  meta: HttpResponseMeta | void,
  collection: Collection,
): QueryCache {
  return {
    ids: collection.map((entity: Entity): string => entity.id),
    meta,
    query,
  };
}

function collectionToUnitQueriesReducerFactory(
  query: HttpQuery,
  meta: HttpResponseMeta | void,
): ArrayReducer<QueryCacheMap, Entity> {
  return function collectionToUnitQueriesReducer(
    acc: QueryCacheMap,
    value: Entity,
  ): QueryCacheMap {
    const queryWithId:HttpQuery = generateQueryForResourceId(
      value.id,
    )(omit(query, 'collection'));

    return {
      ...acc,
      [JSON.stringify(queryWithId)]: createQueryCache(queryWithId, meta, [value]),
    };
  };
}

function createQueryCacheForCollection(
  query: HttpQuery,
  collection: Collection,
  meta: HttpResponseMeta | void,
): QueryCache {
  return createQueryCache(query, meta, collection);
}

function createQueryCacheMapForCollectionItens(
  query: HttpQuery,
  collection: Collection,
  meta: HttpResponseMeta | void,
): QueryCacheMap {
  return collection.reduce(collectionToUnitQueriesReducerFactory(query, meta), {});
}

const queries: QueryCacheReducer = (
  state: ResourceTypeMap = {},
  action: Action,
): ResourceTypeMap => {
  switch (action.type) {
    case HTTP_REQUEST_SUCCEEDED: {
      const query: HttpQuery = action.payload.query;
      if (!query) return state;

      if (!query.resourceType) {
        throw new Error('Property <resourceType> of action.payload.query must be a valid string.');
      }

      const data: mixed | void = action.payload.response.data;
      if (!data) return state;

      const meta: HttpResponseMeta | void = action.payload.response.meta;

      if (query.collection && data instanceof Array) {
        return {
          ...state,
          ...{
            [query.resourceType]: {
              ...{
                [JSON.stringify(query)]: createQueryCacheForCollection(query, data, meta),
              },
              ...createQueryCacheMapForCollectionItens(query, data, meta),
            },
          },
        };
      } else if (data instanceof Object) {
        const entity: Entity = data;
        const collection: Collection = [entity];
        return {
          ...state,
          ...{
            [query.resourceType]: {
              ...{
                [JSON.stringify(query)]: createQueryCache(query, meta, collection),
              },
            },
          },
        };
      }

      return state;
    }

    case CLEAR_CACHE: {
      if (!action.payload) return state;

      return {
        ...state,
        [action.payload]: undefined,
      };
    }

    default:
      return state;
  }
};

export const getQueryCache: GetQueryCacheSelector = (
  state: AppState,
  query: HttpQuery,
): QueryCache | void => (
  state.api.caching.queries[query.resourceType] ?
    state.api.caching.queries[query.resourceType][JSON.stringify(query)] : undefined
);

export const hasQueryCache: HasQueryCacheSelector = (
  state: AppState,
  query: HttpQuery,
): boolean => (
  state.api.caching.queries[query.resourceType] &&
  state.api.caching.queries[query.resourceType][JSON.stringify(query)] !== undefined
);

export default combineReducers({
  queries,
});
