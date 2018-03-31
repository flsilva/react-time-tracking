/*
 * @flow
 */

import type { HttpRequest } from './Types';

type HttpRequestWrapper = { +request: HttpRequest };
type HttpWrapper = { +http: HttpRequestWrapper };

//-----------------------------
// BEGIN HTTP REQUEST SUCCEEDED
//-----------------------------

// eslint-disable-next-line import/prefer-default-export
export const HTTP_REQUEST_SUCCEEDED: 'app/api/request/succeeded' =
  'app/api/request/succeeded';

export type HttpRequestSucceededAction = {
  +type: typeof HTTP_REQUEST_SUCCEEDED,
  +payload: RequestResponseWrapper<mixed>
};

export type HttpRequestSucceededActionCreator = (
  payload: RequestResponseWrapper<mixed>
) => HttpRequestSucceededAction;

//--------------------------
// END HTTP REQUEST SUCCEEDED
//--------------------------

//--------------------------------
// BEGIN READ COLLECTION REQUESTED
//--------------------------------

// eslint-disable-next-line import/prefer-default-export
// export const READ_COLLECTION_REQUESTED: 'net/http/read/collection/requested' =
// 'net/http/read/collection/requested';

// eslint-disable-next-line import/prefer-default-export
export const HTTP_REQUEST_REQUESTED: 'net/http/request/requested' =
  'net/http/request/requested';

export type ReadCollectionRequestedAction = {
  +type: typeof HTTP_REQUEST_REQUESTED,
  +meta: HttpWrapper
};

export type ReadCollectionRequestedActionCreator = (
  request?: HttpRequest
) => ReadCollectionRequestedAction;

//------------------------------
// END READ COLLECTION REQUESTED
//------------------------------
