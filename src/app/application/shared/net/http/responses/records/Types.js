/*
 * @flow
 */

import type { RootState } from '../../Types';
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

//-----------
// END RECORD
//-----------

//--------------------
// BEGIN RECORD GETTER
//--------------------

export type RecordGetter = (state: RootState, query: HttpQuery) => Record | void;

export type RecordGetterFactory = (resourceType: string) => RecordGetter;

export type RecordCollectionGetter = (
  state: RootState,
  query: HttpQuery
) => CollectionWithQueryMetaResult | void;

export type RecordCollectionGetterFactory = (resourceType: string) => RecordCollectionGetter;

//------------------
// END RECORD GETTER
//------------------
