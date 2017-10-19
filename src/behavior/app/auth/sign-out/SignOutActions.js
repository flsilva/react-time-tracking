import { put, takeLatest } from 'redux-saga/effects';

const SIGN_OUT_REQUESTED = 'app/auth/sign-out/requested';
export const SIGN_OUT_STARTED = 'app/auth/sign-out/started';
export const SIGN_OUT_SUCCEEDED = 'app/auth/sign-out/suceeded';
export const SIGN_OUT_FAILED = 'app/auth/sign-out/failed';

export const signOut = () => ({
  type: SIGN_OUT_REQUESTED,
  meta: {
    http: {
      request: {
        method: 'DELETE',
        url: 'auth/sign_out',
      },
    },
  },
});

const signOutStarted = () => ({ type: SIGN_OUT_STARTED });
const signOutSucceeded = payload => ({ type: SIGN_OUT_SUCCEEDED, payload });
const signOutFailed = payload => ({ type: SIGN_OUT_FAILED, payload });

function* signOutSaga({ meta }) {
  try {
    yield put(signOutStarted());
    const { makeRequest, request } = meta.http;
    yield makeRequest(request);
    yield put(signOutSucceeded());
  } catch (error) {
    yield put(signOutFailed(error));
    yield put(signOutSucceeded());
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(SIGN_OUT_REQUESTED, signOutSaga);
}
