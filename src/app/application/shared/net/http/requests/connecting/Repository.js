/*
 * @flow
 */

import type { RootState } from '../../../Types';
import type { HttpRequestAction } from '../Types';
import {
  HTTP_REQUEST_FAILED,
  HTTP_REQUEST_STARTED,
  HTTP_REQUEST_SUCCEEDED,
} from '../Types';

import type {
  ConnectingMap,
  ConnectingReducer,
  IsConnectingGetter,
  IsConnectingGetterFactory,
} from './Types';

const connecting: ConnectingReducer = (
  state: ConnectingMap = {},
  action: HttpRequestAction,
): ConnectingMap => {
  switch (action.type) {
    case HTTP_REQUEST_FAILED:
      return { ...state, ...{ [action.payload.request.id]: false } };

    case HTTP_REQUEST_STARTED: {
      return { ...state, ...{ [action.payload.id]: true } };
    }

    case HTTP_REQUEST_SUCCEEDED: {
      return { ...state, ...{ [action.payload.request.id]: false } };
    }

    default:
      return state;
  }
};

export const createIsConnectingGetter: IsConnectingGetterFactory = (
  requestId: string,
): IsConnectingGetter => (
  function getIsConnecting(state: RootState): boolean {
    return state.net.http.requests.connecting[requestId];
  }
);

export default connecting;
