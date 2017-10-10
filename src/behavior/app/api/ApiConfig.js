import axios from 'axios';
import extractHeaders from './extractHeaders';
import { newTokenReceived, userSignOutSucceeded } from '../auth/AuthActions';
import { getToken, getUser } from '../auth/AuthReducers';

import {
  extractHeadersFromResponse,
  unauthorizedResponseHandler,
} from './responseHandlers';

const unauthorizedMessage = 'Your session has expired, please sign in again.';

const tokenHeaderKeys = [
  'access-token',
  'client',
  'expiry',
  'token-type',
  'uid',
];

let store;

export const init = (_store) => {
  store = _store;
};

const customHeaders = () => ({
  ...getToken(store.getState()),
  'Content-Type': 'application/vnd.api+json',
});

export const getFetcher = () => {
  const fetcher = axios.create({
    baseURL: 'http://192.168.0.4:3000/',
    crossDomain: true,
    headers: customHeaders(),
    timeout: 5000,
  });

  /*
   * we need to exclude it when signing in,
   * otherwise API returns 401 for invalid credentials
   * and we en up with a unauthorized error,
   * which is something we only want when user is signed in
   * already, but its token expired.
   */
  if (getUser(store.getState())) {
    fetcher.interceptors.response.use(
      null,
      unauthorizedResponseHandler(store.dispatch, userSignOutSucceeded, unauthorizedMessage),
    );
  }
  /**/

  fetcher.interceptors.response.use(
    extractHeadersFromResponse(store.dispatch, newTokenReceived, extractHeaders(tokenHeaderKeys)),
  );

  return fetcher;
};
