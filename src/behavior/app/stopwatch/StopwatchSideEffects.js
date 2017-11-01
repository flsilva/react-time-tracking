import { put, select, takeLatest } from 'redux-saga/effects';
import { getStopwatch } from './StopwatchState';
import {
  PAUSE_STOPWATCH_REQUESTED,
  READ_ENTITY_REQUESTED,
  RESET_STOPWATCH_REQUESTED,
  UPDATE_DATE_REQUESTED,
  UPDATE_DESCRIPTION_REQUESTED,
  UPDATE_PROJECT_REQUESTED,
  UPDATE_HOURS_REQUESTED,
  UPDATE_MINUTES_REQUESTED,
  START_STOPWATCH_REQUESTED,
  readEntityFailed,
  readEntityStarted,
  readEntitySucceeded,
  updateDatabase,
  updateEntityFailed,
} from './StopwatchActions';

function* readEntitySaga({ meta }) {
  const { makeRequest, killCache, request } = meta.http;

  if (!killCache) {
    const cachedStopwatch = yield select(getStopwatch);
    if (cachedStopwatch) return;
  }

  try {
    yield put(readEntityStarted());

    const data = yield makeRequest(request);

    yield put(updateDatabase(data));
    yield put(readEntitySucceeded());
  } catch (error) {
    yield put(readEntityFailed(error));
  }
}

function* updateStopwatchSaga({ meta }) {
  const { makeRequest, request } = meta.http;

  try {
    // optimistic update
    yield put(updateDatabase(request.data));
    //

    const data = yield makeRequest(request);
    yield put(updateDatabase(data));
  } catch (error) {
    yield put(updateEntityFailed(error));
  }
}

export default function* () {
  yield takeLatest([
    PAUSE_STOPWATCH_REQUESTED,
    RESET_STOPWATCH_REQUESTED,
    UPDATE_DATE_REQUESTED,
    UPDATE_DESCRIPTION_REQUESTED,
    UPDATE_PROJECT_REQUESTED,
    UPDATE_HOURS_REQUESTED,
    UPDATE_MINUTES_REQUESTED,
    START_STOPWATCH_REQUESTED,
  ], updateStopwatchSaga);

  yield takeLatest(READ_ENTITY_REQUESTED, readEntitySaga);
}
