import { put, takeLatest } from 'redux-saga/effects';
import { EMAIL_SIGN_IN_SUCCEEDED } from './email/EmailSignInActions';
import { RESTORE_SESSION_SUCCEEDED } from './restore-session/RestoreSessionActions';
import { SIGN_OUT_SUCCEEDED } from './sign-out/SignOutActions';

export const NEW_TOKEN_RECEIVED = 'app/auth/new-token-received';
export const USER_SIGN_IN_SUCCEEDED = 'app/auth/user/sign-in/suceeded';
export const USER_SIGN_OUT_SUCCEEDED = 'app/auth/user/sign-out/suceeded';

export const newTokenReceived = payload => ({ type: NEW_TOKEN_RECEIVED, payload });
export const userSignInSucceeded = payload => ({ type: USER_SIGN_IN_SUCCEEDED, payload });
export const userSignOutSucceeded = () => ({ type: USER_SIGN_OUT_SUCCEEDED });

function* userSignInSucceededSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');

  yield put(userSignInSucceeded(action.payload));
}

function* userSignOutSucceededSaga() {
  yield put(userSignOutSucceeded());
}

export function* bindActionsToSagas() {
  yield takeLatest([
    EMAIL_SIGN_IN_SUCCEEDED,
    RESTORE_SESSION_SUCCEEDED,
  ], userSignInSucceededSaga);

  yield takeLatest(SIGN_OUT_SUCCEEDED, userSignOutSucceededSaga);
}
