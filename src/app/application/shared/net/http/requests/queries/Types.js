/*
 * @flow
 */

import type { RootState } from '../../../Types';
import type { UpdateResourceDatabaseAction } from '../../resources/Types';
import type { HttpResponseMeta } from '../Types';

// eslint-disable-next-line import/prefer-default-export
export const CLEAR_CACHE: 'shared/net/http/caching/clear' =
  'shared/net/http/caching/clear';

export type HttpUnitQuery = { +id?: string, +include?: string };

export type HttpCollectionQuery = {
  +'page[number]': number,
  +'page[size]': number,
  +sort: string
};

export type HttpQuery = {
  +collection?: HttpCollectionQuery,
  +resourceType: string,
  +unit?: HttpUnitQuery
};

export type QueryMetaResult = {
  +ids: Array<string>,
  +meta?: HttpResponseMeta,
  +query: HttpQuery
};

export type QueryMetaResultMap = { +[query: string]: QueryMetaResult };

export type QueryMetaResultReducer = (
  state: QueryMetaResultMap,
  action: UpdateResourceDatabaseAction
) => QueryMetaResultMap;

export type GetQueryMetaResultSelector = (
  state: RootState,
  query: HttpQuery
) => QueryMetaResult | void;

export type HasQueryMetaResultSelector = (state: RootState, query: HttpQuery) => boolean;

export type ClearCacheAction = {
  +type: typeof CLEAR_CACHE,
  +payload: string
};

export type ClearCacheActionCreator = (
  payload: string
) => ClearCacheAction;
