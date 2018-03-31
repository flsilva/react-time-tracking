/*
 * @flow
 */

import type {
  RequestResponseWrapper,
  ResourceObject,
  ResourceObjectCollection,
} from '../Types';
import type {
  UpdateResourceDatabaseAction,
  UpdateResourceDatabaseActionCreator,
} from './Types';
import { UPDATE_RESOURCE_DATABASE } from './Types';

// eslint-disable-next-line import/prefer-default-export
export const updateResourceDatabase: UpdateResourceDatabaseActionCreator = (
  payload: RequestResponseWrapper<ResourceObject | ResourceObjectCollection>,
): UpdateResourceDatabaseAction => ({
  type: UPDATE_RESOURCE_DATABASE,
  payload,
});
