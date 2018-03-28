import { put, takeLatest } from 'redux-saga/effects';
import { EMAIL_SIGN_IN_SUCCEEDED } from './email/EmailSignInActions';
import { RESTORE_SESSION_SUCCEEDED } from './restore-session/RestoreSessionActions';
import { SIGN_OUT_SUCCEEDED } from './sign-out/SignOutActions';
import {
  userSignInSucceeded,
  userSignOutSucceeded,
} from './AuthActions';

function* userSignInSucceededSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');

  yield put(userSignInSucceeded(action.payload));
}

function* userSignOutSucceededSaga() {
  yield put(userSignOutSucceeded());
}

export default function* () {
  yield takeLatest([
    EMAIL_SIGN_IN_SUCCEEDED,
    RESTORE_SESSION_SUCCEEDED,
  ], userSignInSucceededSaga);

  yield takeLatest(SIGN_OUT_SUCCEEDED, userSignOutSucceededSaga);
}
