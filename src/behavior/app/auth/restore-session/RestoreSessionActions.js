import { put, takeLatest } from 'redux-saga/effects';

const RESTORE_SESSION_REQUESTED = 'app/auth/restore-session/requested';
export const RESTORE_SESSION_STARTED = 'app/auth/restore-session/started';
export const RESTORE_SESSION_SUCCEEDED = 'app/auth/restore-session/suceeded';
export const RESTORE_SESSION_FAILED = 'app/auth/restore-session/failed';

export const restoreSession = () => ({
  type: RESTORE_SESSION_REQUESTED,
  meta: {
    http: {
      request: {
        method: 'GET',
        url: 'auth/validate_token',
      },
    },
  },
});

const restoreSessionStarted = () => ({ type: RESTORE_SESSION_STARTED });
const restoreSessionSucceeded = payload => ({ type: RESTORE_SESSION_SUCCEEDED, payload });
const restoreSessionFailed = payload => ({ type: RESTORE_SESSION_FAILED, payload });

function* restoreSessionSaga({ meta }) {
  try {
    yield put(restoreSessionStarted());
    const { makeRequest, request } = meta.http;
    const response = yield makeRequest(request);
    yield put(restoreSessionSucceeded(response.data.data));
  } catch (error) {
    yield put(restoreSessionFailed(error));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(RESTORE_SESSION_REQUESTED, restoreSessionSaga);
}
