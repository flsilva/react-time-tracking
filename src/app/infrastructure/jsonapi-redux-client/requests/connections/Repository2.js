/*
 * @flow
 */

import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import trim from 'lodash/trim';
import type { RootState } from '../../Types';
import type { HttpRequestAction } from '../Types';
import {
  HTTP_REQUEST_FAILED,
  HTTP_REQUEST_STARTED,
  HTTP_REQUEST_SUCCEEDED,
} from '../';

import type {
  ConnectionMap,
  ConnectionReducer,
  ConnectionChecker,
  ConnectionCheckerFactory,
} from './Types';

export const reduceConnections: ConnectionReducer = (
  state: ConnectionMap = {},
  action: HttpRequestAction,
): ConnectionMap => {
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

export const createConnectionChecker: ConnectionCheckerFactory = (
  requestId: string,
): ConnectionChecker => {
  if (!isString(requestId) || isEmpty(trim(requestId))) {
    throw new Error('Argument <requestId> must be a valid string.');
  }

  function hasConnection(state: RootState): boolean {
    return state.jsonApi.requests.connections[requestId];
  }

  return hasConnection;
};
