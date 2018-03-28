/*
 * @flow
 */

import type {
  HttpRequestSucceededAction,
  HttpRequestSucceededActionCreator,
  HttpResponseWithQuery,
} from './types';
import { HTTP_REQUEST_SUCCEEDED } from './types';

// eslint-disable-next-line import/prefer-default-export
export const httpRequestSucceeded: HttpRequestSucceededActionCreator = (
  payload: HttpResponseWithQuery<mixed>,
): HttpRequestSucceededAction => ({
  type: HTTP_REQUEST_SUCCEEDED,
  payload,
});
