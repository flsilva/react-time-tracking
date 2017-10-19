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

export default (store, observeStore) => {
  /* We need to read token from LocalStorage before calling registerObservers(),
   * because it triggers its saveTokenToLocalStorage() callback
   * sending null as token, and having it written to LocalStorage,
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

export const middleware = store => next => (action) => {
  const newAction = cloneDeep(action);
  if (!newAction.meta) newAction.meta = {};
  if (!newAction.meta.auth) newAction.meta.auth = {};

  newAction.meta.auth.extractAuthDataFromObject = extractAuthDataFromObject;
  newAction.meta.auth.token = getToken(store.getState());

  const user = getUser(store.getState());
  if (!user) return next(newAction);

  newAction.meta.auth.user = user;

  /*
   * we don't want to run unauthorized logic when there's no signed in user
   * (e.g. when trying to sign up or sign in),
   * because API returns 401 for invalid credentials,
   * so in that case if we do run unauthorized logic
   * we end up with an unauthorized error,
   * which is something we want only when users are signed in,
   * but their tokens have expired.
   */
  newAction.meta.auth.unauthorizedHandler = unauthorizedHandler;
  /**/

  return next(newAction);
};
