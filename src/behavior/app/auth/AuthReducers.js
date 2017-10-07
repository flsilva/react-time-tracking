import { combineReducers } from 'redux';
import {
  NEW_TOKEN_RECEIVED,
  USER_SIGN_IN_SUCCEEDED,
  USER_SIGN_OUT_SUCCEEDED,
} from './AuthActions';
import emailSignIn from './email/EmailSignInReducers';
import emailSignUp from './email/EmailSignUpReducers';
import restoreSession from './restore-session/RestoreSessionReducers';
import signOut from './sign-out/SignOutReducers';

const STORAGE_TOKEN_ID = 'APP_TOKEN';

const user = (state = null, action) => {
  switch (action.type) {
    case USER_SIGN_IN_SUCCEEDED:
      return action.payload || null;

    case USER_SIGN_OUT_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

export const getUser = state => state.auth.user;

const token = (state = null, action) => {
  // THINK ABOUT CREATING A NEW KILL_TOKEN, FIRED AFTER SIGN_OUT,
  // TO CLEAR HEADERS HERE
  switch (action.type) {
    case NEW_TOKEN_RECEIVED:
      return action.payload || null;

    case USER_SIGN_OUT_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

export const getToken = state => state.auth.token;

export const getTokenFromLocalStorage = () => (
  JSON.parse(localStorage.getItem(STORAGE_TOKEN_ID))
);

const saveTokenToLocalStorage = (_token) => {
  console.log('AuthReducers().saveTokenToLocalStorage() - _token: ', _token);
  localStorage.setItem(STORAGE_TOKEN_ID, JSON.stringify(_token));
};

export const init = (store, observeStore) => {
  observeStore(store, getToken, saveTokenToLocalStorage);
};

export default combineReducers({
  restoreSession,
  emailSignIn,
  emailSignUp,
  signOut,
  token,
  user,
});
