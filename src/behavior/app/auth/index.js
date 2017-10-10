import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { newTokenReceived, userSignOutSucceeded } from './AuthActions';
import { getToken, getTokenFromLocalStorage, init as initState } from './AuthState';
import { restoreSession } from './restore-session/RestoreSessionActions';

const tokenHeaderKeys = [
  'access-token',
  'client',
  'expiry',
  'token-type',
  'uid',
];
const unauthorizedMessage = 'Your session has expired, please sign in again.';
let store;

export default (_store, observeStore) => {
  store = _store;
  /* We need to read token from LocalStorage before calling initState(),
   * because it triggers observeStore()'s saveTokenToLocalStorage() callback
   * sending null as token, having it written to LocalStorage,
   * essentially loosing it afterwards.
   */
  const token = getTokenFromLocalStorage();
  /**/

  initState(store, observeStore);

  if (token) {
    store.dispatch(newTokenReceived(token));
    store.dispatch(restoreSession());
  }
};

export const getAuthHeaders = () => getToken(store.getState());

export const extractHttpAuthHeadersFromResponse = dispatch => (response) => {
  const headers = pick(response.headers, tokenHeaderKeys);
  if (!isEmpty(headers)) {
    dispatch(newTokenReceived(headers));
  }

  return response;
};

export const unauthorizedHttpResponseHandler = dispatch => (error) => {
  if (error.response.status !== 401) return Promise.reject(error);
  dispatch(userSignOutSucceeded());
  return Promise.reject(unauthorizedMessage);
};
