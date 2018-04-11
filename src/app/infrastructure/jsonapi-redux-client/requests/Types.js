/*
 * @flow
 */

import type { HttpErrorCollection } from '../responses/errors/Types';
import type {
  ResourceMutationPayloadWrapper,
  ResourceObjectCollection,
} from '../responses/resources/Types';
import type { ConnectionMap } from './connections/Types';
import type { HttpQuery, QueryMetaResultMap } from './queries/Types';

export type RequestState = {
  +connections: ConnectionMap,
  +queries: QueryMetaResultMap
};

//-------------------
// BEGIN HTTP REQUEST
//-------------------

export const DELETE_REQUEST: string = 'DELETE';
export const GET_REQUEST: string = 'GET';
export const PATCH_REQUEST: string = 'PATCH';
export const POST_REQUEST: string = 'POST';
export const PUT_REQUEST: string = 'PUT';

export const HTTP_REQUEST_REQUESTED: 'net/http/request/requested' =
  'net/http/request/requested';

export type HttpHeaders = { +[headerName: string]: string };

export type LifeCycleCallback = {
  +args?: Array<mixed>,
  +fn: () => mixed,
  +isAction?: boolean
};

export type SucceededLifeCycle = {
  +afterUpdateResources?: Array<LifeCycleCallback>,
  +beforeUpdateResources?: Array<LifeCycleCallback>
};

export type HttpRequestLifeCycle = {
  +failed?: Array<LifeCycleCallback>,
  +started?: Array<LifeCycleCallback>,
  +succeeded?: SucceededLifeCycle
};

export type HttpRequest = {
  +headers?: HttpHeaders,
  +id: string,
  +ignoreResponse?: boolean,
  +killCache?: boolean,
  +lifecycle?: HttpRequestLifeCycle,
  +method: string,
  +payload?: ResourceMutationPayloadWrapper,
  +query?: HttpQuery,
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

export type ResponseErrorWrapper = {
  +error: HttpErrorCollection,
  +request: HttpRequest
};

//------------------
// END HTTP RESPONSE
//------------------

//--------------------------
// BEGIN HTTP REQUEST ACTION
//--------------------------

export type RequestAction = {
  +type: typeof HTTP_REQUEST_REQUESTED,
  +meta: HttpWrapper
};

export type RequestActionCreator = (
  request: HttpRequest
) => RequestAction;

//------------------------
// END HTTP REQUEST ACTION
//------------------------

//--------------------------
// BEGIN HTTP REQUEST CACHED
//--------------------------

export const HTTP_REQUEST_CACHED: 'net/http/request/cached' =
  'net/http/request/cached';

export type HttpRequestCachedAction = { +type: typeof HTTP_REQUEST_CACHED };

export type HttpRequestCachedActionCreator = () => HttpRequestCachedAction;

//------------------------
// END HTTP REQUEST CACHED
//------------------------

//---------------------------
// BEGIN HTTP REQUEST STARTED
//---------------------------

export const HTTP_REQUEST_STARTED: 'net/http/request/started' =
  'net/http/request/started';

export type HttpRequestStartedAction = {
  +type: typeof HTTP_REQUEST_STARTED,
  +payload: HttpRequest
};

export type HttpRequestStartedActionCreator = (
  payload: HttpRequest
) => HttpRequestStartedAction;

//-------------------------
// END HTTP REQUEST STARTED
//-------------------------

//-----------------------------
// BEGIN HTTP REQUEST SUCCEEDED
//-----------------------------

export const HTTP_REQUEST_SUCCEEDED: 'net/http/request/succeeded' =
  'net/http/request/succeeded';

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

//--------------------------
// BEGIN HTTP REQUEST FAILED
//--------------------------

export const HTTP_REQUEST_FAILED: 'net/http/request/failed' =
  'net/http/request/failed';

export type HttpRequestFailedAction = {
  +type: typeof HTTP_REQUEST_FAILED,
  +payload: ResponseErrorWrapper
};

export type HttpRequestFailedActionCreator = (
  payload: ResponseErrorWrapper
) => HttpRequestFailedAction;

//-------------------------
// END HTTP REQUEST STARTED
//-------------------------

//-------------------
// BEGIN HTTP FETCHER
//-------------------

export type HttpFetcher<ResponsePayload> = (
  resource: HttpRequest
) => Promise<HttpResponse<ResponsePayload>>;

//-----------------
// END HTTP FETCHER
//-----------------

export type HttpRequestAction =
  | HttpRequestFailedAction
  | HttpRequestStartedAction
  | HttpRequestSucceededAction;
