/*
 * @flow
 */

import build from 'redux-object';
import type { RootState } from '../../Types';
import type { HttpQuery, QueryMetaResult } from '../requests/queries/Types';
import { getQueryMetaResult } from '../requests/queries/Repository';
import { generateQueryForResourceId } from '../requests/queries/Utils';
import type {
  CollectionWithQueryMetaResult,
  Record,
  RecordCollection,
  RecordCollectionGetter,
  RecordCollectionGetterFactory,
  RecordGetter,
  RecordGetterFactory,
} from './Types';

export const createRecordGetter: RecordGetterFactory = (
  resourceType: string,
): RecordGetter => (
  function getRecord(state: RootState, query: HttpQuery): Record | void {
    if (!query) throw new Error('Argument <query> must not be null.');
    if (!query.unit) throw new Error('Argument <query.unit> must not be null.');

    const id: string | void = query.unit.id;
    if (!id) throw new Error('Argument <query.unit.id> must not be null.');

    const opts: { eager: boolean, ignoreLinks: boolean } = {
      eager: true,
      ignoreLinks: true,
    };

    const record: Record = build(state.net.http.resources, resourceType, id, opts);
    if (record === null) return undefined;

    return record;
  }
);

export const createRecordCollectionGetter: RecordCollectionGetterFactory = (
  resourceType: string,
): RecordCollectionGetter => (
  function getRecordCollection(
    state: RootState,
    query: HttpQuery,
  ): CollectionWithQueryMetaResult | void {
    if (!state.net.http.resources[resourceType]) return undefined;

    const queryMetaResult: QueryMetaResult | void = getQueryMetaResult(state, query);
    if (!queryMetaResult) return undefined;

    const collection: RecordCollection = [];

    queryMetaResult.ids.forEach((id: string): Record | void => {
      const record: Record | void = createRecordGetter(resourceType)(
        state,
        generateQueryForResourceId(id)(queryMetaResult.query),
      );

      if (record !== undefined) collection.push(record);
    });

    return {
      collection,
      queryMetaResult,
    };
  }
);
