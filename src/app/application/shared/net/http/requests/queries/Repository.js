/*
 * @flow
 */

import omit from 'lodash/omit';
import type { ArrayReducer } from '../../../../../../../types';
import type { RootState } from '../../../Types';
import { generateQueryForResourceId } from './Utils';
import type {
  ResourceObject,
  ResourceObjectCollection,
  UpdateResourceDatabaseAction,
} from '../../responses/resources/Types';
import { CLEAR_RESOURCE_DATABASE, UPDATE_RESOURCE_DATABASE } from '../../responses/resources';
import type { HttpResponseMeta } from '../Types';

import type {
  GetQueryMetaResultSelector,
  HasQueryMetaResultSelector,
  HttpQuery,
  QueryMetaResult,
  QueryMetaResultMap,
  QueryMetaResultReducer,
} from './Types';
import { CLEAR_CACHE } from './Types';

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
  collection: ResourceObjectCollection,
): QueryMetaResult {
  return {
    ids: collection.map((resourceObject: ResourceObject): string => resourceObject.id),
    meta,
    query,
  };
}

function collectionToUnitQueriesReducerFactory(
  query: HttpQuery,
  meta: HttpResponseMeta | void,
): ArrayReducer<QueryMetaResultMap, ResourceObject> {
  return function collectionToUnitQueriesReducer(
    acc: QueryMetaResultMap,
    value: ResourceObject,
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
  collection: ResourceObjectCollection,
  meta: HttpResponseMeta | void,
): QueryMetaResult {
  return createQueryMetaResult(query, meta, collection);
}

function createQueryMetaResultMapForCollectionItens(
  query: HttpQuery,
  collection: ResourceObjectCollection,
  meta: HttpResponseMeta | void,
): QueryMetaResultMap {
  return collection.reduce(collectionToUnitQueriesReducerFactory(query, meta), {});
}

export const getQueryMetaResult: GetQueryMetaResultSelector = (
  state: RootState,
  query: HttpQuery,
): QueryMetaResult | void => (
  state.net.http.requests.queries[JSON.stringify(query)]
);

export const hasQueryMetaResult: HasQueryMetaResultSelector = (
  state: RootState,
  query: HttpQuery,
): boolean => (
  state.net.http.requests.queries[JSON.stringify(query)] !== undefined
);

export const reduceQueries: QueryMetaResultReducer = (
  state: QueryMetaResultMap = {},
  action: UpdateResourceDatabaseAction,
): QueryMetaResultMap => {
  switch (action.type) {
    case UPDATE_RESOURCE_DATABASE: {
      const query: HttpQuery | void = action.payload.request.query;
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
        const resourceObject: ResourceObject = data;
        const collection: ResourceObjectCollection = [resourceObject];
        return {
          ...state,
          ...{
            [JSON.stringify(query)]: createQueryMetaResult(query, meta, collection),
          },
        };
      }

      return state;
    }

    // case CLEAR_CACHE: {
    case CLEAR_RESOURCE_DATABASE: {
      if (!action.payload) return state;

      return clearCache(state, action.payload);
    }

    default:
      return state;
  }
};
