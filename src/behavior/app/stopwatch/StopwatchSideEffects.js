import { put, select, takeLatest } from 'redux-saga/effects';
import { getStopwatch } from './StopwatchState';
import {
  PAUSE_STOPWATCH_REQUESTED,
  READ_STOPWATCH_REQUESTED,
  RESET_STOPWATCH_REQUESTED,
  SET_ACTIVITY_DATE_REQUESTED,
  SET_ACTIVITY_DESCRIPTION_REQUESTED,
  SET_ACTIVITY_PROJECT_REQUESTED,
  SET_STOPWATCH_HOURS_REQUESTED,
  SET_STOPWATCH_MINUTES_REQUESTED,
  START_STOPWATCH_REQUESTED,
  readStopwatchFailed,
  readStopwatchStarted,
  readStopwatchSucceeded,
  updateDatabase,
  updateStopwatchFailed,
} from './StopwatchActions';

function* readStopwatchSaga({ meta }) {
  const { makeRequest, killCache, request } = meta.http;

  if (!killCache) {
    const cachedStopwatch = yield select(getStopwatch);
    if (cachedStopwatch) return;
  }

  try {
    yield put(readStopwatchStarted());

    const data = yield makeRequest(request);

    yield put(updateDatabase(data));
    yield put(readStopwatchSucceeded());
  } catch (error) {
    yield put(readStopwatchFailed(error));
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
    yield put(updateStopwatchFailed(error));
  }
}

export default function* () {
  yield takeLatest([
    PAUSE_STOPWATCH_REQUESTED,
    RESET_STOPWATCH_REQUESTED,
    SET_ACTIVITY_DATE_REQUESTED,
    SET_ACTIVITY_DESCRIPTION_REQUESTED,
    SET_ACTIVITY_PROJECT_REQUESTED,
    SET_STOPWATCH_HOURS_REQUESTED,
    SET_STOPWATCH_MINUTES_REQUESTED,
    START_STOPWATCH_REQUESTED,
  ], updateStopwatchSaga);

  yield takeLatest(READ_STOPWATCH_REQUESTED, readStopwatchSaga);
}
