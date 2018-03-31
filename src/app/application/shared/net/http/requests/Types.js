/*
 * @flow
 */

import type {
  ResourceMutationPayloadWrapper,
  ResourceObjectCollection,
} from '../resources/Types';
import type { HttpQuery, QueryMetaResultMap } from './queries/Types';

export type RequestState = { +queries: QueryMetaResultMap };

//-------------------
// BEGIN HTTP REQUEST
//-------------------

export const HTTP_REQUEST_REQUESTED: 'net/http/request/requested' =
  'net/http/request/requested';

export type HttpHeaders = { +[headerName: string]: string };

export type HttpRequestLifeCycle = {
  +failed?: Array<() => mixed>,
  +started?: Array<() => mixed>,
  +succeeded?: Array<() => mixed>
};

export type HttpRequest = {
  +headers?: HttpHeaders,
  +method: string,
  +killCache?: boolean,
  +lifecycle?: HttpRequestLifeCycle,
  +payload?: ResourceMutationPayloadWrapper,
  +query?: HttpQuery,
  +shouldHandleResponse?: boolean,
  +url: string
};

export type HttpRequestWrapper = { +request: HttpRequest };

export type HttpWrapper = { +http: HttpRequestWrapper };

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

export type RequestResponseWrapper<ResponsePayload> = {
  +request: HttpRequest,
  +response: HttpResponse<ResponsePayload>
};

//------------------
// END HTTP RESPONSE
//------------------

//------------------------------
// BEGIN READ RESOURCE REQUESTED
//------------------------------

export type ReadResourceRequestedAction = {
  +type: typeof HTTP_REQUEST_REQUESTED,
  +meta: HttpWrapper
};

export type ReadResourceRequestedActionCreator = (
  request?: HttpRequest
) => ReadResourceRequestedAction;

//----------------------------
// END READ RESOURCE REQUESTED
//----------------------------

//-----------------------------------------
// BEGIN READ RESOURCE COLLECTION REQUESTED
//-----------------------------------------

export type ReadCollectionRequestedAction = {
  +type: typeof HTTP_REQUEST_REQUESTED,
  +meta: HttpWrapper
};

export type ReadCollectionRequestedActionCreator = (
  request?: HttpRequest
) => ReadCollectionRequestedAction;

//---------------------------------------
// END READ RESOURCE COLLECTION REQUESTED
//---------------------------------------

//-----------------------------
// BEGIN HTTP REQUEST SUCCEEDED
//-----------------------------

export const HTTP_REQUEST_SUCCEEDED: 'app/api/request/succeeded' =
  'app/api/request/succeeded';

export type HttpRequestSucceededAction = {
  +type: typeof HTTP_REQUEST_SUCCEEDED,
  +payload: RequestResponseWrapper<mixed>
};

export type HttpRequestSucceededActionCreator = (
  payload: RequestResponseWrapper<mixed>
) => HttpRequestSucceededAction;

//---------------------------
// END HTTP REQUEST SUCCEEDED
//---------------------------

//-------------------
// BEGIN HTTP FETCHER
//-------------------

export type HttpFetcher<ResponsePayload> = (
  resource: HttpRequest
) => Promise<HttpResponse<ResponsePayload>>;

//-----------------
// END HTTP FETCHER
//-----------------
