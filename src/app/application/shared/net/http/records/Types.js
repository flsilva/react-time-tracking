/*
 * @flow
 */

import type { AppState } from '../../../../types';
import type { HttpQuery, QueryMetaResult } from '../requests/queries/Types';

//-------------
// BEGIN RECORD
//-------------

export type Record = { +id: string };
export type RecordCollection = Array<Record>;

export type CollectionWithQueryMetaResult = {
  +collection: RecordCollection,
  +queryMetaResult: QueryMetaResult
};

//-------------
// BEGIN RECORD
//-------------

//--------------------
// BEGIN RECORD GETTER
//--------------------

export type RecordGetter = (state: AppState, query: HttpQuery) => Record | void;

export type RecordGetterFactory = (resourceType: string) => RecordGetter;

export type RecordCollectionGetter = (
  state: AppState,
  query: HttpQuery
) => CollectionWithQueryMetaResult | void;

export type RecordCollectionGetterFactory = (resourceType: string) => RecordCollectionGetter;

//------------------
// END RECORD GETTER
//------------------
