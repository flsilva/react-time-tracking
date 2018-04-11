/*
 * @flow
 */

import type {
  HttpRequestLifeCycle,
  RequestAction,
} from '../../infrastructure/jsonapi-redux-client/requests/Types';
import type {
  HttpQuery,
} from '../../infrastructure/jsonapi-redux-client/requests/queries/Types';
import type { ResourceMutationPayloadWrapper } from '../../infrastructure/jsonapi-redux-client/responses/resources/Types';

//----------------------
// BEGIN CREATE RESOURCE
//----------------------

export type ResourceCreator = (
  payload: ResourceMutationPayloadWrapper,
  lifecycle?: HttpRequestLifeCycle
) => RequestAction;

//--------------------
// END CREATE RESOURCE
//--------------------

//--------------------
// BEGIN READ RESOURCE
//--------------------

export type ResourceReader = (
  query: HttpQuery
) => RequestAction;

//------------------
// END READ RESOURCE
//------------------

//----------------------
// BEGIN UPDATE RESOURCE
//----------------------

export type ResourceUpdater = (
  payload: ResourceMutationPayloadWrapper,
  lifecycle?: HttpRequestLifeCycle
) => RequestAction;

//--------------------
// END UPDATE RESOURCE
//--------------------

//----------------------
// BEGIN DELETE RESOURCE
//----------------------

export type ResourceRemover = (
  id: string,
  lifecycle?: HttpRequestLifeCycle
) => RequestAction;

//--------------------
// END DELETE RESOURCE
//--------------------
