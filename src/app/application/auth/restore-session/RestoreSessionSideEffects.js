import { put, takeLatest } from 'redux-saga/effects';
import {
  RESTORE_SESSION_REQUESTED,
  restoreSessionFailed,
  restoreSessionStarted,
  restoreSessionSucceeded,
} from './RestoreSessionActions';

function* restoreSessionSaga({ meta }) {
  try {
    yield put(restoreSessionStarted());
    const { makeRequest, request } = meta.http;
    const data = yield makeRequest(request);
    yield put(restoreSessionSucceeded(data.data));
  } catch (error) {
    yield put(restoreSessionFailed(error));
  }
}

export default function* () {
  yield takeLatest(RESTORE_SESSION_REQUESTED, restoreSessionSaga);
}
