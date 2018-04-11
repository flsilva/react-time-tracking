/*
 * @flow
 */

import type { RootState } from '../../Types';
import type { HttpRequestAction } from '../../requests/Types';
import { HTTP_REQUEST_FAILED, HTTP_REQUEST_STARTED, HTTP_REQUEST_SUCCEEDED } from '../../requests';

import type {
  ErrorMap,
  ErrorReducer,
  ErrorGetter,
  ErrorGetterFactory,
  HttpErrorCollection,
} from './Types';

export const reduceErrors: ErrorReducer = (
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
  function getError(state: RootState): HttpErrorCollection {
    return state.jsonApi.responses.errors[requestId];
  }
);
