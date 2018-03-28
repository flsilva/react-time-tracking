/*
 * @flow
 */

import type { CachingState } from './caching/types';

//----------------
// BEGIN API STATE
//----------------

export type HttpState = { +caching: CachingState };

//--------------
// END API STATE
//--------------

//-----------------
// BEGIN API ERRORS
//-----------------

export type ApiError = { +detail: string };

export type ApiErrors = Array<ApiError> | null;

//---------------
// END API ERRORS
//---------------

//-------------
// BEGIN ENTITY
//-------------

export type ResourceRelationship = { +id: string, +type: string };

export type ResourceRelationshipWrapper = { +data: ResourceRelationship };

export type ResourceRelationships = { +[relName: string]: ResourceRelationshipWrapper };

export type CreateResourcePayload = {
  +relationships?: ResourceRelationships,
  +type: string
};

export type UpdateResourcePayload = CreateResourcePayload & { +id: string };

export type ResourcePayload =
  | CreateResourcePayload
  | UpdateResourcePayload;

export type ResourcePayloadWrapper = { +data: ResourcePayload };

export type ResourceObject = {
  +id: string,
  +relationships?: ResourceRelationships,
  +type: string
};

export type ResourceObjectCollection = Array<ResourceObject>;

//-----------
// END ENTITY
//-----------

//-------------------
// BEGIN HTTP REQUEST
//-------------------

export type HttpHeaders = { +[headerName: string]: string };

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

export type HttpResource = {
  +headers?: HttpHeaders,
  +method: string,
  +payload?: ResourcePayloadWrapper,
  +query?: HttpQuery,
  +url: string
};

export type HttpRequest = {
  +errorCb?: () => mixed,
  +killCache?: boolean,
  +resource: HttpResource,
  +successCb?: () => mixed
};

//-----------------
// END HTTP REQUEST
//-----------------

//--------------------
// BEGIN HTTP RESPONSE
//--------------------

export type HttpResponseLinks = { +first?: string, +last?: string };

export type HttpResponseMeta = { +'total-pages': number, +'total-records': number };

export type HttpResponse<ResponsePayload> = {
  +data?: ResponsePayload,
  +included?: ResourceObjectCollection,
  +links?: HttpResponseLinks,
  +meta?: HttpResponseMeta
};

export type HttpResponseWithQuery<ResponsePayload> = {
  +query: HttpQuery,
  +response: HttpResponse<ResponsePayload>
};

//------------------
// END HTTP RESPONSE
//------------------

//-----------------------------
// BEGIN HTTP REQUEST SUCCEEDED
//-----------------------------

// eslint-disable-next-line import/prefer-default-export
export const HTTP_REQUEST_SUCCEEDED: 'app/api/request/succeeded' =
  'app/api/request/succeeded';

export type HttpRequestSucceededAction = {
  +type: typeof HTTP_REQUEST_SUCCEEDED,
  +payload: HttpResponseWithQuery<mixed>
};

export type HttpRequestSucceededActionCreator = (
  payload: HttpResponseWithQuery<mixed>
) => HttpRequestSucceededAction;

//--------------------------
// END HTTP REQUEST SUCEEDED
//--------------------------

//-------------------
// BEGIN HTTP FETCHER
//-------------------

export type HttpFetcher<ResponsePayload> = (
  resource: HttpResource
) => Promise<HttpResponse<ResponsePayload>>;

//-----------------
// END HTTP FETCHER
//-----------------

export type Action =
  | HttpRequestSucceededAction;
