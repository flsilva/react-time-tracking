/*
 * @flow
 */

import type { AppState } from '../../types';
import type { Action, HttpQuery, HttpResponseMeta } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const CLEAR_CACHE: 'app/api/caching/clear' =
  'app/api/caching/clear';

export type QueryCache = {
  +ids: Array<string>,
  +meta?: HttpResponseMeta,
  +query: HttpQuery
};

export type QueryCacheMap = { +[query: string]: QueryCache };

export type ResourceTypeMap = { +[resourceType: string]: QueryCacheMap };

export type QueryCacheReducer = (
  state: ResourceTypeMap,
  action: Action
) => ResourceTypeMap;

export type CachingState = { +queries: ResourceTypeMap };

export type GetQueryCacheSelector = (
  state: AppState,
  query: HttpQuery
) => QueryCache | void;

export type HasQueryCacheSelector = (state: AppState, query: HttpQuery) => boolean;

export type ClearCacheAction = {
  +type: typeof CLEAR_CACHE,
  +payload: string
};

export type ClearCacheActionCreator = (
  payload: string
) => ClearCacheAction;
