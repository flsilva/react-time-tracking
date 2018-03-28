/*
 * @flow
 */

import type {
  HttpRequestSucceededAction,
  HttpRequestSucceededActionCreator,
  HttpResponseWithQuery,
} from './Types';
import { HTTP_REQUEST_SUCCEEDED } from './Types';

// eslint-disable-next-line import/prefer-default-export
export const httpRequestSucceeded: HttpRequestSucceededActionCreator = (
  payload: HttpResponseWithQuery<mixed>,
): HttpRequestSucceededAction => ({
  type: HTTP_REQUEST_SUCCEEDED,
  payload,
});
