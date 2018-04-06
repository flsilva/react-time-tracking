/*
 * @flow
 */

import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPatchRequest,
  HttpPostRequest,
  HttpRequest,
  HttpRequestCachedAction,
  HttpRequestCachedActionCreator,
  HttpRequestStartedAction,
  HttpRequestStartedActionCreator,
  HttpRequestSucceededAction,
  HttpRequestSucceededActionCreator,
  HttpRequestFailedAction,
  HttpRequestFailedActionCreator,
  RequestAction,
  RequestActionCreator,
  RequestResponseWrapper,
  ResponseErrorWrapper,
} from './Types';
import {
  HTTP_REQUEST_CACHED,
  HTTP_REQUEST_REQUESTED,
  HTTP_REQUEST_STARTED,
  HTTP_REQUEST_SUCCEEDED,
  HTTP_REQUEST_FAILED,
} from './Types';

export const createDeleteAction: RequestActionCreator<HttpDeleteRequest> = (
  request: HttpDeleteRequest,
): RequestAction<HttpDeleteRequest> => ({
  type: HTTP_REQUEST_REQUESTED,
  meta: {
    http: {
      request,
    },
  },
});

export const createGetAction: RequestActionCreator<HttpGetRequest> = (
  request: HttpGetRequest,
): RequestAction<HttpGetRequest> => ({
  type: HTTP_REQUEST_REQUESTED,
  meta: {
    http: {
      request,
    },
  },
});

export const createPatchAction: RequestActionCreator<HttpPatchRequest> = (
  request: HttpPatchRequest,
): RequestAction<HttpPatchRequest> => ({
  type: HTTP_REQUEST_REQUESTED,
  meta: {
    http: {
      request,
    },
  },
});

export const createPostAction: RequestActionCreator<HttpPostRequest> = (
  request: HttpPostRequest,
): RequestAction<HttpPostRequest> => ({
  type: HTTP_REQUEST_REQUESTED,
  meta: {
    http: {
      request,
    },
  },
});

export const httpRequestStarted: HttpRequestStartedActionCreator = (
  payload: HttpRequest,
): HttpRequestStartedAction => ({
  type: HTTP_REQUEST_STARTED,
  payload,
});

export const httpRequestSucceeded: HttpRequestSucceededActionCreator = (
  payload: RequestResponseWrapper<mixed>,
): HttpRequestSucceededAction => ({
  type: HTTP_REQUEST_SUCCEEDED,
  payload,
});

export const httpRequestFailed: HttpRequestFailedActionCreator = (
  payload: ResponseErrorWrapper,
): HttpRequestFailedAction => ({
  type: HTTP_REQUEST_FAILED,
  payload,
});

export const httpRequestCached: HttpRequestCachedActionCreator = (
): HttpRequestCachedAction => ({
  type: HTTP_REQUEST_CACHED,
});
