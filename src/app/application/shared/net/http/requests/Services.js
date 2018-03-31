/*
 * @flow
 */

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import type {
  HttpRequest,
  HttpRequestSucceededAction,
  HttpRequestSucceededActionCreator,
  ReadCollectionRequestedAction,
  ReadCollectionRequestedActionCreator,
  ReadResourceRequestedAction,
  ReadResourceRequestedActionCreator,
  RequestResponseWrapper,
} from './Types';
import { HTTP_REQUEST_REQUESTED, HTTP_REQUEST_SUCCEEDED } from './Types';

export const createHttpRequest = (type, request) => ({
  type,
  meta: {
    http: {
      request: merge({ shouldHandleResponse: true }, cloneDeep(request)),
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export const httpRequestSucceeded: HttpRequestSucceededActionCreator = (
  payload: RequestResponseWrapper<mixed>,
): HttpRequestSucceededAction => ({
  type: HTTP_REQUEST_SUCCEEDED,
  payload,
});

export const readResource: ReadResourceRequestedActionCreator = (
  request?: HttpRequest,
): ReadResourceRequestedAction => createHttpRequest(
  HTTP_REQUEST_REQUESTED,
  merge(
    {
      lifecycle: {},
      method: 'GET',
    },
    cloneDeep(request),
  ),
);

export const readResourceCollection: ReadCollectionRequestedActionCreator = (
  request?: HttpRequest,
): ReadCollectionRequestedAction => createHttpRequest(
  HTTP_REQUEST_REQUESTED,
  merge(
    {
      lifecycle: {},
      method: 'GET',
    },
    cloneDeep(request),
  ),
);
