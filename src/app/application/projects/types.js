/*
 * @flow
 */

import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPatchRequest,
  HttpPostRequest,
  HttpRequestLifeCycle,
  RequestAction,
} from '../shared/net/http/requests/Types';
import type {
  HttpQuery,
} from '../shared/net/http/requests/queries/Types';
import type {
  CreateResourcePayload,
  ResourceMutationPayloadWrapper,
  UpdateResourcePayload,
} from '../shared/net/http/resources/Types';

//----------------------
// BEGIN CREATE RESOURCE
//----------------------

export type ResourceCreator = (
  payload: ResourceMutationPayloadWrapper<CreateResourcePayload>,
  lifecycle?: HttpRequestLifeCycle
) => RequestAction<HttpPostRequest>;

//--------------------
// END CREATE RESOURCE
//--------------------

//--------------------
// BEGIN READ RESOURCE
//--------------------

export type ResourceReader = (
  query: HttpQuery
) => RequestAction<HttpGetRequest>;

//------------------
// END READ RESOURCE
//------------------

//----------------------
// BEGIN UPDATE RESOURCE
//----------------------

export type ResourceUpdater = (
  payload: ResourceMutationPayloadWrapper<UpdateResourcePayload>,
  lifecycle?: HttpRequestLifeCycle
) => RequestAction<HttpPatchRequest>;

//--------------------
// END UPDATE RESOURCE
//--------------------

//----------------------
// BEGIN DELETE RESOURCE
//----------------------

export type ResourceRemover = (
  id: string,
  lifecycle?: HttpRequestLifeCycle
) => RequestAction<HttpDeleteRequest>;

//--------------------
// END DELETE RESOURCE
//--------------------
