/*
 * @flow
 */

import type { RequestResponseWrapper } from '../requests/Types';

//---------------
// BEGIN RESOURCE
//---------------

export type ResourceIdentifier = { +id: string, +type: string };
export type ResourceIdentifierCollection = Array<ResourceIdentifier>;

export type ResourceRelationshipWrapper = {
  +data: ResourceIdentifier | ResourceIdentifierCollection
};

export type ResourceRelationshipMap = { +[relName: string]: ResourceRelationshipWrapper };

export type CreateResourcePayload = {
  +relationships?: ResourceRelationshipMap,
  +type: string
};

export type UpdateResourcePayload = CreateResourcePayload & { +id: string };

export type ResourceMutationPayload =
  | CreateResourcePayload
  | UpdateResourcePayload;

export type ResourceMutationPayloadWrapper = { +data: ResourceMutationPayload };

// eslint-disable-next-line flowtype/no-weak-types
export type ResourceObjectAttributes = { +[attrName: string]: mixed };

export type ResourceObject = ResourceIdentifier & {
  +attributes?: ResourceObjectAttributes,
  +relationships?: ResourceRelationshipMap
};

export type ResourceObjectCollection = Array<ResourceObject>;

//-------------
// END RESOURCE
//-------------

//------------------------
// BEGIN RESOURCE DATABASE
//------------------------

// eslint-disable-next-line import/prefer-default-export
export const UPDATE_RESOURCE_DATABASE: 'net/http/resource/database/update' =
  'net/http/resource/database/update';

export type UpdateResourceDatabaseAction = {
  +type: typeof UPDATE_RESOURCE_DATABASE,
  +payload: RequestResponseWrapper<ResourceObject | ResourceObjectCollection>
};

export type UpdateResourceDatabaseActionCreator = (
  payload: RequestResponseWrapper<ResourceObject | ResourceObjectCollection>
) => UpdateResourceDatabaseAction;

export type ResourceMap = { +[resourceId: string]: ResourceObject };

export type ResourceDatabase = { +[resourceType: string]: ResourceMap };

export type ResourceDatabaseReducer = (
  state: ResourceDatabase,
  action: UpdateResourceDatabaseAction
) => ResourceDatabase;

//----------------------
// END RESOURCE DATABASE
//----------------------
