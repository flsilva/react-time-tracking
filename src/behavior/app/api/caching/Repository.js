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
  GetQueryMetaResultSelector,
  HasQueryMetaResultSelector,
  QueryMetaResult,
  QueryMetaResultMap,
  QueryMetaResultReducer,
} from './types';
import { CLEAR_CACHE } from './types';

function clearCache(
  state: QueryMetaResultMap = {},
  resourceType: string,
): QueryMetaResultMap {
  return Object.keys(state)
    .filter((query: string): boolean => state[query].query.resourceType !== resourceType)
    .reduce((acc: QueryMetaResultMap, query: string): QueryMetaResultMap => (
      { ...acc, [query]: state[query] }
    ), {});
}

function createQueryMetaResult(
  query: HttpQuery,
  meta: HttpResponseMeta | void,
  collection: Collection,
): QueryMetaResult {
  return {
    ids: collection.map((entity: Entity): string => entity.id),
    meta,
    query,
  };
}

function collectionToUnitQueriesReducerFactory(
  query: HttpQuery,
  meta: HttpResponseMeta | void,
): ArrayReducer<QueryMetaResultMap, Entity> {
  return function collectionToUnitQueriesReducer(
    acc: QueryMetaResultMap,
    value: Entity,
  ): QueryMetaResultMap {
    const queryWithId:HttpQuery = generateQueryForResourceId(
      value.id,
    )(omit(query, 'collection'));

    return {
      ...acc,
      [JSON.stringify(queryWithId)]: createQueryMetaResult(queryWithId, meta, [value]),
    };
  };
}

function createQueryMetaResultForCollection(
  query: HttpQuery,
  collection: Collection,
  meta: HttpResponseMeta | void,
): QueryMetaResult {
  return createQueryMetaResult(query, meta, collection);
}

function createQueryMetaResultMapForCollectionItens(
  query: HttpQuery,
  collection: Collection,
  meta: HttpResponseMeta | void,
): QueryMetaResultMap {
  return collection.reduce(collectionToUnitQueriesReducerFactory(query, meta), {});
}

export const getQueryMetaResult: GetQueryMetaResultSelector = (
  state: AppState,
  query: HttpQuery,
): QueryMetaResult | void => (
  state.api.caching.queries[JSON.stringify(query)]
);

export const hasQueryMetaResult: HasQueryMetaResultSelector = (
  state: AppState,
  query: HttpQuery,
): boolean => (
  state.api.caching.queries[JSON.stringify(query)] !== undefined
);

const queries: QueryMetaResultReducer = (
  state: QueryMetaResultMap = {},
  action: Action,
): QueryMetaResultMap => {
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
            [JSON.stringify(query)]: createQueryMetaResultForCollection(query, data, meta),
          },
          ...createQueryMetaResultMapForCollectionItens(query, data, meta),
        };
      } else if (data instanceof Object) {
        const entity: Entity = data;
        const collection: Collection = [entity];
        return {
          ...state,
          ...{
            [JSON.stringify(query)]: createQueryMetaResult(query, meta, collection),
          },
        };
      }

      return state;
    }

    case CLEAR_CACHE: {
      if (!action.payload) return state;

      return clearCache(state, action.payload);
    }

    default:
      return state;
  }
};

export default combineReducers({
  queries,
});
