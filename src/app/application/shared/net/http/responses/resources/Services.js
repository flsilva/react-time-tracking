/*
 * @flow
 */

import type { RequestResponseWrapper } from '../requests/Types';
import type {
  ResourceObject,
  ResourceObjectCollection,
  ClearResourceDatabaseAction,
  ClearResourceDatabaseActionCreator,
  UpdateResourceDatabaseAction,
  UpdateResourceDatabaseActionCreator,
} from './Types';
import { CLEAR_RESOURCE_DATABASE, UPDATE_RESOURCE_DATABASE } from './Types';

export const clearResourceDatabase: ClearResourceDatabaseActionCreator = (
  payload: string,
): ClearResourceDatabaseAction => ({
  type: CLEAR_RESOURCE_DATABASE,
  payload,
});

export const updateResourceDatabase: UpdateResourceDatabaseActionCreator = (
  payload: RequestResponseWrapper<ResourceObject | ResourceObjectCollection>,
): UpdateResourceDatabaseAction => ({
  type: UPDATE_RESOURCE_DATABASE,
  payload,
});
