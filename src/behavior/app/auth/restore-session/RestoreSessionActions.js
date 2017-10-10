import { call, put, takeLatest } from 'redux-saga/effects';
import { getFetcher } from '../../api/ApiConfig';
import { extractApiErrors } from '../../api/ApiErrors';

export const RESTORE_SESSION_REQUESTED = 'RESTORE_SESSION_REQUESTED';
export const RESTORE_SESSION_STARTED = 'RESTORE_SESSION_STARTED';
export const RESTORE_SESSION_SUCCEEDED = 'RESTORE_SESSION_SUCCEEDED';
export const RESTORE_SESSION_FAILED = 'RESTORE_SESSION_FAILED';

export const restoreSession = () => ({ type: RESTORE_SESSION_REQUESTED });
const restoreSessionStarted = () => ({ type: RESTORE_SESSION_STARTED });
const restoreSessionSucceeded = payload => ({ type: RESTORE_SESSION_SUCCEEDED, payload });
const restoreSessionFailed = payload => ({ type: RESTORE_SESSION_FAILED, payload });

const restoreSessionPromise = () => (
  getFetcher().get('auth/validate_token')
);

function* restoreSessionSaga() {
  try {
    yield put(restoreSessionStarted());

    const response = yield call(restoreSessionPromise);

    yield put(restoreSessionSucceeded(response.data.data));
  } catch (error) {
    yield put(restoreSessionFailed(extractApiErrors(error.response.data)));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(RESTORE_SESSION_REQUESTED, restoreSessionSaga);
}
