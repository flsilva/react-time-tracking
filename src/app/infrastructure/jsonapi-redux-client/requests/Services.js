/*
 * @flow
 */

import type {
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
import { validateRequest } from './Utils';

export const createRequestAction: RequestActionCreator = (
  request: HttpRequest,
): RequestAction => {
  if (!request) throw new Error('Argument <request> must not be null.');

  validateRequest(request);

  return {
    type: HTTP_REQUEST_REQUESTED,
    meta: {
      http: {
        request,
      },
    },
  };
};

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
