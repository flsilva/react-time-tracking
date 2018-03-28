import { put, select, takeLatest } from 'redux-saga/effects';
import { getEntities } from './StopwatchState';
import {
  READ_ENTITIES_REQUESTED,
  UPDATE_DATE_REQUESTED,
  UPDATE_DESCRIPTION_REQUESTED,
  UPDATE_PROJECT_REQUESTED,
  UPDATE_HOURS_REQUESTED,
  UPDATE_MINUTES_REQUESTED,
  PAUSE_STOPWATCH_REQUESTED,
  RESET_STOPWATCH_REQUESTED,
  START_STOPWATCH_REQUESTED,
  readEntitiesFailed,
  readEntitiesStarted,
  readEntitiesSucceeded,
  updateEntityFailed,
  updateDatabase,
} from './StopwatchActions';

function* readEntitiesSaga({ meta }) {
  const { makeRequest, killCache, request } = meta.http;

  if (!killCache) {
    const cachedResult = yield select(getEntities, request.params);
    if (cachedResult) return;
  }

  try {
    yield put(readEntitiesStarted());

    const data = yield makeRequest(request);

    yield put(updateDatabase(data));
    yield put(readEntitiesSucceeded({ data, query: request.params }));
  } catch (error) {
    yield put(readEntitiesFailed(error));
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

  yield takeLatest(READ_ENTITIES_REQUESTED, readEntitiesSaga);
}
