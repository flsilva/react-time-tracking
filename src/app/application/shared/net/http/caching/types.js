/*
 * @flow
 */

import type { AppState } from '../../../../types';
import type { Action, HttpQuery, HttpResponseMeta } from '../Types';

// eslint-disable-next-line import/prefer-default-export
export const CLEAR_CACHE: 'app/shared/net/http/caching/clear' =
  'app/shared/net/http/caching/clear';

export type QueryMetaResult = {
  +ids: Array<string>,
  +meta?: HttpResponseMeta,
  +query: HttpQuery
};

export type QueryMetaResultMap = { +[query: string]: QueryMetaResult };

export type QueryMetaResultReducer = (
  state: QueryMetaResultMap,
  action: Action
) => QueryMetaResultMap;

export type CachingState = { +queries: QueryMetaResultMap };

export type GetQueryMetaResultSelector = (
  state: AppState,
  query: HttpQuery
) => QueryMetaResult | void;

export type HasQueryMetaResultSelector = (state: AppState, query: HttpQuery) => boolean;

export type ClearCacheAction = {
  +type: typeof CLEAR_CACHE,
  +payload: string
};

export type ClearCacheActionCreator = (
  payload: string
) => ClearCacheAction;
