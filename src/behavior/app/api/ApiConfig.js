import pipe from 'lodash/fp/pipe';
import axios from 'axios';
import ApiFetcher from './ApiFetcher';
import extractHeaders from './extractHeaders';
import { newTokenReceived, userSignOutSucceeded } from '../auth/AuthActions';
import { getToken, getUser } from '../auth/AuthReducers';

import {
  addApiPathToRequest,
  addContentTypeJsonToRequest,
  addCorsModeToRequest,
  addTokenToRequest,
} from './requestHandlers';

import {
  removeTokenFromLocalStorage,
  unauthorizedResponseHandler,
  unauthorizedResponseHandler2,
  addResponseTokenToState,
  extractHeadersFromResponse,
  addResponseTokenToLocalStorage,
  returnJsonResponse,
} from './responseHandlers';

const STORAGE_TOKEN_ID = 'APP_TOKEN';
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

export const getFetcher = () => {
  let tokenObj = store.getState().auth.token;
  if (!tokenObj) tokenObj = JSON.parse(localStorage.getItem(STORAGE_TOKEN_ID));

  const requestPipe = pipe(
    addApiPathToRequest('http://192.168.0.4:3000/'),
    addContentTypeJsonToRequest,
    addCorsModeToRequest,
    addTokenToRequest(tokenObj),
  );

  const responsePipe = pipe(
    removeTokenFromLocalStorage(STORAGE_TOKEN_ID),
    unauthorizedResponseHandler(store.dispatch, userSignOutSucceeded, unauthorizedMessage),
    addResponseTokenToState(store.dispatch, newTokenReceived, extractHeaders(tokenHeaderKeys)),
    addResponseTokenToLocalStorage(extractHeaders(tokenHeaderKeys), STORAGE_TOKEN_ID),
    returnJsonResponse,
  );

  return new ApiFetcher(requestPipe, responsePipe);
};

const customHeaders = () => ({
  ...getToken(store.getState()),
  'Content-Type': 'application/vnd.api+json',
});

export const getFetcher2 = () => {
  const fetcher = axios.create({
    baseURL: 'http://192.168.0.4:3000/',
    crossDomain: true,
    headers: customHeaders(),
    timeout: 5000,
  });

  // we need to exclude it when signing in,
  // otherwise API returns 401 for invalid credentials
  // and we en up with a unauthorized error,
  // which is something we only want when user is signed in
  // already, but its token expired.
  if (getUser(store.getState())) {
    fetcher.interceptors.response.use(
      null,
      unauthorizedResponseHandler2(store.dispatch, userSignOutSucceeded, unauthorizedMessage),
    );
  }

  fetcher.interceptors.response.use(
    extractHeadersFromResponse(store.dispatch, newTokenReceived, extractHeaders(tokenHeaderKeys)),
  );

  return fetcher;
};
