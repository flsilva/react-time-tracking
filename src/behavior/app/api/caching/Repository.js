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
  CachedQueries,
  CachedQueriesReducer,
  CachedQuery,
  GetQueryCachedSelector,
  IsQueryCachedSelector,
} from './types';
import { CLEAR_CACHE } from './types';

function createCachedQuery(
  query: HttpQuery,
  meta: HttpResponseMeta | void,
  collection: Collection,
): CachedQuery {
  return {
    ids: collection.map((entity: Entity): string => entity.id),
    meta,
    query,
  };
}

function collectionToUnitQueriesReducerFactory(
  query: HttpQuery,
  meta: HttpResponseMeta | void,
): ArrayReducer<CachedQueries, Entity> {
  return function collectionToUnitQueriesReducer(
    acc: CachedQueries,
    value: Entity,
  ): CachedQueries {
    const queryWithId:HttpQuery = generateQueryForResourceId(
      value.id,
    )(omit(query, 'collection'));

    return {
      ...acc,
      [JSON.stringify(queryWithId)]: createCachedQuery(queryWithId, meta, [value]),
    };
  };
}

function createCachedQueryForCollection(
  query: HttpQuery,
  collection: Collection,
  meta: HttpResponseMeta | void,
): CachedQuery {
  return createCachedQuery(query, meta, collection);
}

function createCachedQueriesForCollectionItens(
  query: HttpQuery,
  collection: Collection,
  meta: HttpResponseMeta | void,
): CachedQueries {
  return collection.reduce(collectionToUnitQueriesReducerFactory(query, meta), {});
}

const queries: CachedQueriesReducer = (
  state: CachedQueries = {},
  action: Action,
): CachedQueries => {
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
                [JSON.stringify(query)]: createCachedQueryForCollection(query, data, meta),
              },
              ...createCachedQueriesForCollectionItens(query, data, meta),
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
                [JSON.stringify(query)]: createCachedQuery(query, meta, collection),
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

export const getQueryCached: GetQueryCachedSelector = (
  state: AppState,
  query: HttpQuery,
): CachedQuery | void => (
  state.api.caching.queries[query.resourceType] ?
    state.api.caching.queries[query.resourceType][JSON.stringify(query)] : undefined
);

export const isQueryCached: IsQueryCachedSelector = (
  state: AppState,
  query: HttpQuery,
): boolean => (
  state.api.caching.queries[query.resourceType] &&
  state.api.caching.queries[query.resourceType][JSON.stringify(query)] !== undefined
);

export default combineReducers({
  queries,
});
