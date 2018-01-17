/*
 * @flow
 */

import type { AppState } from '../../types';
import type { Action, HttpQuery, HttpResponseMeta } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const CLEAR_CACHE: 'app/api/caching/clear' =
  'app/api/caching/clear';

export type CachedQuery = {
  +ids: Array<string>,
  +meta?: HttpResponseMeta,
  +query: HttpQuery
};

export type CachedQueries = { +[query: string]: CachedQuery };

export type CachedQueriesReducer = (
  state: CachedQueries,
  action: Action
) => CachedQueries;

export type CachingState = { +queries: CachedQueries };

export type GetQueryCachedSelector = (
  state: AppState,
  query: HttpQuery
) => CachedQuery | void;

export type IsQueryCachedSelector = (state: AppState, query: HttpQuery) => boolean;

export type ClearCacheAction = {
  +type: typeof CLEAR_CACHE,
  +payload: string
};

export type ClearCacheActionCreator = (
  payload: string
) => ClearCacheAction;
