import { call, put, takeLatest } from 'redux-saga/effects';
import { getFetcher } from '../../';

export const SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED';
export const SIGN_OUT_STARTED = 'SIGN_OUT_STARTED';
export const SIGN_OUT_SUCCEEDED = 'SIGN_OUT_SUCCEEDED';
export const SIGN_OUT_FAILED = 'SIGN_OUT_FAILED';

export const signOut = () => ({ type: SIGN_OUT_REQUESTED });
const signOutStarted = () => ({ type: SIGN_OUT_STARTED });
const signOutSucceeded = payload => ({ type: SIGN_OUT_SUCCEEDED, payload });
const signOutFailed = payload => ({ type: SIGN_OUT_FAILED, payload });

const signOutPromise = () => getFetcher().delete('auth/sign_out');

function* signOutSaga() {
  try {
    yield put(signOutStarted());
    yield call(signOutPromise);
    yield put(signOutSucceeded());
  } catch (error) {
    yield put(signOutFailed(error));
    yield put(signOutSucceeded());
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(SIGN_OUT_REQUESTED, signOutSaga);
}
