import pipe from 'lodash/fp/pipe';
import ApiFetcher from './ApiFetcher';
import { newTokenReceived } from '../auth/AuthActions';
import { signOutSuccess } from '../auth/sign-out/SignOutActions';
import extractHeaders from './extractHeaders';

import {
  addApiPathToRequest,
  addContentTypeJsonToRequest,
  addCorsModeToRequest,
  addTokenToRequest,
} from './requestHandlers';

import {
  removeTokenFromLocalStorage,
  unauthorizedResponseHandler,
  addResponseTokenToState,
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

let dispatch;
let getState;

export const init = (_dispatch, _getState) => {
  dispatch = _dispatch;
  getState = _getState;
};

export const getFetcher = () => {
  let tokenObj = getState().auth.token;
  if (!tokenObj) tokenObj = JSON.parse(localStorage.getItem(STORAGE_TOKEN_ID));

  const requestPipe = pipe(
    addApiPathToRequest('http://192.168.0.4:3000/'),
    addContentTypeJsonToRequest,
    addCorsModeToRequest,
    addTokenToRequest(tokenObj),
  );

  const responsePipe = pipe(
    removeTokenFromLocalStorage(STORAGE_TOKEN_ID),
    unauthorizedResponseHandler(dispatch, signOutSuccess, unauthorizedMessage),
    addResponseTokenToState(dispatch, newTokenReceived, extractHeaders(tokenHeaderKeys)),
    addResponseTokenToLocalStorage(extractHeaders(tokenHeaderKeys), STORAGE_TOKEN_ID),
    returnJsonResponse,
  );

  return new ApiFetcher(requestPipe, responsePipe);
};
