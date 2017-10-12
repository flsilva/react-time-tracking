import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { newTokenReceived, userSignOutSucceeded } from './AuthActions';
import { getToken, getTokenFromLocalStorage, getUser, registerObservers } from './AuthState';
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

  registerObservers(store, observeStore);

  if (token) {
    store.dispatch(newTokenReceived(token));
    store.dispatch(restoreSession());
  }
};

export const getAuthHeaders = () => getToken(store.getState());

export const extractAuthDataFromObject = (dispatch, object) => {
  const token = pick(object, tokenHeaderKeys);
  if (!isEmpty(token)) {
    dispatch(newTokenReceived(token));
  }
};

export const unauthorizedHandler = (dispatch) => {
  dispatch(userSignOutSucceeded());
  return unauthorizedMessage;
};

export const authMiddleware = _store => next => (action) => {
  console.log('authMiddleware() - action', action);

  const user = getUser(_store.getState());
  if (!user) return next(action);

  const newAction = cloneDeep(action);
  if (!newAction.meta) newAction.meta = {};
  if (!newAction.meta.auth) newAction.meta.auth = {};
  newAction.meta.auth.user = user;

  return next(newAction);
};
