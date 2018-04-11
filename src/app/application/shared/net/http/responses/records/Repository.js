/*
 * @flow
 */

import build from 'redux-object';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import trim from 'lodash/trim';
import type { RootState } from '../../../Types';
import { getResourceDatabase, hasResource, hasResourceMap } from '../resources';
import { generateQueryForResourceId, getQueryMetaResult } from '../../requests/queries';
import type { HttpQuery, QueryMetaResult } from '../../requests/queries/Types';
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
): RecordGetter => {
  if (!isString(resourceType) || isEmpty(trim(resourceType))) {
    throw new Error('Argument <resourceType> must be a valid string.');
  }

  function getRecord(state: RootState, query: HttpQuery): Record | void {
    if (!query) throw new Error('Argument <query> must not be null.');
    if (!query.unit) throw new Error('Argument <query.unit> must not be null.');

    const id: string | void = query.unit.id;
    if (!isString(id) || isEmpty(trim(id))) {
      throw new Error('Argument <query.unit.id> must be a valid string.');
    }

    if (!hasResource(state, resourceType, id)) return undefined;

    const opts: { eager: boolean, ignoreLinks: boolean } = {
      eager: true,
      ignoreLinks: true,
    };

    const record: Record = build(getResourceDatabase(state), resourceType, id, opts);
    if (record === null) return undefined;

    return record;
  }

  return getRecord;
};

export const createRecordCollectionGetter: RecordCollectionGetterFactory = (
  resourceType: string,
): RecordCollectionGetter => (
  function getRecordCollection(
    state: RootState,
    query: HttpQuery,
  ): CollectionWithQueryMetaResult | void {
    if (!hasResourceMap(state, resourceType)) return undefined;

    const queryMetaResult: QueryMetaResult | void = getQueryMetaResult(state, query);
    if (!queryMetaResult) return undefined;

    const collection: RecordCollection = [];

    queryMetaResult.ids.forEach((id: string): Record | void => {
      const queryWithId: HttpQuery = generateQueryForResourceId(id)(queryMetaResult.query);
      const record: Record | void = createRecordGetter(resourceType)(state, queryWithId);

      if (record !== undefined) collection.push(record);
    });

    return {
      collection,
      queryMetaResult,
    };
  }
);
