/*
 * @flow
 */

import type { AppState } from '../../../../../types';
import type { HttpErrorCollection } from '../../Types';
import type { HttpRequestAction } from '../Types';
import { HTTP_REQUEST_FAILED, HTTP_REQUEST_STARTED, HTTP_REQUEST_SUCCEEDED } from '../Types';

import type {
  ErrorMap,
  ErrorReducer,
  ErrorGetter,
  ErrorGetterFactory,
} from './Types';

const error: ErrorReducer = (
  state: ErrorMap = {},
  action: HttpRequestAction,
): ErrorMap => {
  switch (action.type) {
    case HTTP_REQUEST_FAILED:
      return { ...state, ...{ [action.payload.request.id]: action.payload.error } };

    case HTTP_REQUEST_STARTED:
      return { ...state, ...{ [action.payload.id]: undefined } };

    case HTTP_REQUEST_SUCCEEDED:
      return { ...state, ...{ [action.payload.request.id]: undefined } };

    default:
      return state;
  }
};

export const createErrorGetter: ErrorGetterFactory = (
  requestId: string,
): ErrorGetter => (
  function getError(state: AppState): HttpErrorCollection {
    return state.net.http.requests.errors[requestId];
  }
);

export default error;
