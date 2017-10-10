import { call, put, select, takeLatest } from 'redux-saga/effects';
import addSeconds from 'date-fns/add_seconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import isDate from 'date-fns/is_date';
import { getStopwatch } from './StopwatchReducers';
import { getFetcher } from '../api/ApiConfig';
import { extractApiErrors } from '../api/ApiErrors';
import { addRelationshipToPayload, formatPayloadToApi } from '../api/JsonApiUtils';

export const SET_ACTIVITY_DATE_REQUESTED = 'app/stopwatch/set/date/requested';
export const SET_ACTIVITY_DESCRIPTION_REQUESTED = 'app/stopwatch/set/description/requested';
export const SET_STOPWATCH_HOURS_REQUESTED = 'app/stopwatch/set/hours/requested';
export const SET_STOPWATCH_MINUTES_REQUESTED = 'app/stopwatch/set/minutes/requested';
export const SET_ACTIVITY_PROJECT_REQUESTED = 'app/stopwatch/set/project/requested';
export const READ_STOPWATCH_REQUESTED = 'app/stopwatch/read/requested';
export const READ_STOPWATCH_STARTED = 'app/stopwatch/read/started';
export const READ_STOPWATCH_SUCCEEDED = 'app/stopwatch/read/succeeded';
export const READ_STOPWATCH_FAILED = 'app/stopwatch/read/failed';
export const PAUSE_STOPWATCH_REQUESTED = 'app/stopwatch/pause/requested';
export const START_STOPWATCH_REQUESTED = 'app/stopwatch/start/requested';
export const RESET_STOPWATCH_REQUESTED = 'app/stopwatch/reset/requested';
export const UPDATE_STOPWATCH_FAILED = 'app/stopwatch/update/failed';
export const UPDATE_DATABASE = 'app/stopwatch/update/database';

export const readStopwatch = () => ({ type: READ_STOPWATCH_REQUESTED });
const readStopwatchStarted = () => ({ type: READ_STOPWATCH_STARTED });
const readStopwatchSucceeded = payload => ({ type: READ_STOPWATCH_SUCCEEDED, payload });
const readStopwatchFailed = payload => ({ type: READ_STOPWATCH_FAILED, payload });

export const updateStopwatchFailed = payload => ({ type: UPDATE_STOPWATCH_FAILED, payload });
export const startStopwatch = () => ({ type: START_STOPWATCH_REQUESTED });
export const pauseStopwatch = () => ({ type: PAUSE_STOPWATCH_REQUESTED });
export const setStopwatchHours = payload => ({
  type: SET_STOPWATCH_HOURS_REQUESTED,
  payload,
});
export const setStopwatchMinutes = payload => ({
  type: SET_STOPWATCH_MINUTES_REQUESTED,
  payload,
});

export const setActivityDate = payload => ({
  type: SET_ACTIVITY_DATE_REQUESTED,
  payload,
});

export const setActivityProject = payload => ({
  type: SET_ACTIVITY_PROJECT_REQUESTED,
  payload,
});

export const setActivityDescription = payload => ({
  type: SET_ACTIVITY_DESCRIPTION_REQUESTED,
  payload,
});

export const resetStopwatch = () => ({ type: RESET_STOPWATCH_REQUESTED });

const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

const getTotalElapsedSeconds = (startedAt, activityTotalTime) => (
  startedAt ?
    differenceInSeconds(addSeconds(new Date(), activityTotalTime), startedAt) : activityTotalTime
);

const getTime = (startedAt, activityTotalTime) => {
  const totalElapsedSeconds = getTotalElapsedSeconds(startedAt, activityTotalTime);
  const hours = Math.floor(totalElapsedSeconds / 3600);
  const minutes = Math.floor(totalElapsedSeconds / 60) - (hours * 60);
  let seconds = totalElapsedSeconds - (minutes * 60) - (hours * 3600);
  if (seconds < 10) seconds = `0${seconds}`;

  return { hours, minutes, seconds };
};

const updateStopwatchPromise = payload => (
  getFetcher().patch(`stopwatches/${payload.data.id}?include=author,project`, payload)
);

const readStopwatchPromise = () => getFetcher().get('stopwatches');

function* readStopwatchSaga(action) {
  if (!action.meta || !action.meta.killCache) {
    const cachedStopwatch = yield select(getStopwatch);

    if (cachedStopwatch) {
      yield put(readStopwatchSucceeded({ data: cachedStopwatch }));
      return;
    }
  }

  try {
    yield put(readStopwatchStarted());

    const response = yield call(readStopwatchPromise);

    yield put(updateDatabase({ data: response.data }));
    yield put(readStopwatchSucceeded({ data: response.data }));
  } catch (error) {
    yield put(readStopwatchFailed(extractApiErrors(error.response.data)));
  }
}

function* startStopwatchSaga() {
  try {
    // optimistic update
    const { id } = yield select(getStopwatch);
    const payload = formatPayloadToApi('stopwatches', { id, startedAt: new Date() });
    yield put(updateDatabase({ data: payload }));
    //

    const response = yield call(updateStopwatchPromise, payload);
    yield put(updateDatabase({ data: response.data }));
  } catch (error) {
    yield put(updateStopwatchFailed(extractApiErrors(error)));
  }
}

function* pauseStopwatchSaga() {
  try {
    // optimistic update
    const stopwatch = yield select(getStopwatch);
    const { activityTotalTime, id, startedAt } = stopwatch;

    const newActivityTotalTime = activityTotalTime + differenceInSeconds(new Date(), startedAt);

    const attributes = {
      id,
      activityTotalTime: newActivityTotalTime,
      startedAt: null,
    };
    const payload = formatPayloadToApi('stopwatches', attributes);
    yield put(updateDatabase({ data: payload }));
    //

    const response = yield call(updateStopwatchPromise, payload);
    yield put(updateDatabase({ data: response.data }));
  } catch (error) {
    yield put(updateStopwatchFailed(extractApiErrors(error)));
  }
}

function* setStopwatchHoursSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');

  const hours = action.payload;

  if (hours !== 0 && !hours) {
    throw new Error('Argument <action.payload> must not be null.');
  }

  if (isNaN(hours)) {
    throw new Error('Argument <action.payload> must be an integer.');
  }

  try {
    // optimistic update
    const { activityTotalTime, id, startedAt } = yield select(getStopwatch);
    const currentHours = getTime(startedAt, activityTotalTime).hours;

    if (hours === currentHours) return;

    let newActivityTotalTime = activityTotalTime;
    if (hours > currentHours) {
      newActivityTotalTime += (hours - currentHours) * 3600;
    } else {
      newActivityTotalTime -= (currentHours - hours) * 3600;
    }

    const attributes = { id, activityTotalTime: newActivityTotalTime };
    const payload = formatPayloadToApi('stopwatches', attributes);
    yield put(updateDatabase({ data: payload }));
    //

    const response = yield call(updateStopwatchPromise, payload);
    yield put(updateDatabase({ data: response.data }));
  } catch (error) {
    yield put(updateStopwatchFailed(extractApiErrors(error)));
  }
}

function* setStopwatchMinutesSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');

  const minutes = action.payload;

  if (minutes !== 0 && !minutes) {
    throw new Error('Argument <action.payload> must not be null.');
  }

  if (isNaN(minutes)) {
    throw new Error('Argument <action.payload> must be an integer.');
  }

  try {
    // optimistic update
    const { activityTotalTime, id, startedAt } = yield select(getStopwatch);
    const currentMinutes = getTime(startedAt, activityTotalTime).minutes;

    if (minutes === currentMinutes) return;

    let newActivityTotalTime = activityTotalTime;
    if (minutes > currentMinutes) {
      newActivityTotalTime += (minutes - currentMinutes) * 60;
    } else {
      newActivityTotalTime -= (currentMinutes - minutes) * 60;
    }

    const attributes = { id, activityTotalTime: newActivityTotalTime };
    const payload = formatPayloadToApi('stopwatches', attributes);
    yield put(updateDatabase({ data: payload }));
    //

    const response = yield call(updateStopwatchPromise, payload);
    yield put(updateDatabase({ data: response.data }));
  } catch (error) {
    yield put(updateStopwatchFailed(extractApiErrors(error)));
  }
}

function* setActivityDateSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!isDate(action.payload)) {
    throw new Error('Argument <action.payload> must be a Date object.');
  }

  try {
    // optimistic update
    const { id } = yield select(getStopwatch);
    const attributes = { id, activityDate: action.payload };
    const payload = formatPayloadToApi('stopwatches', attributes);
    yield put(updateDatabase({ data: payload }));
    //

    const response = yield call(updateStopwatchPromise, payload);
    yield put(updateDatabase({ data: response.data }));
  } catch (error) {
    yield put(updateStopwatchFailed(extractApiErrors(error)));
  }
}

function* setActivityProjectSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must be a String ID.');

  try {
    // optimistic update
    const { id } = yield select(getStopwatch);
    let payload = formatPayloadToApi('stopwatches', { id });
    payload = addRelationshipToPayload(payload, 'project', 'projects', action.payload);
    yield put(updateDatabase({ data: payload }));
    //

    const response = yield call(updateStopwatchPromise, payload);
    yield put(updateDatabase({ data: response.data }));
  } catch (error) {
    yield put(updateStopwatchFailed(extractApiErrors(error)));
  }
}

function* setActivityDescriptionSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');

  try {
    // optimistic update
    const { id } = yield select(getStopwatch);
    const description = action.payload;
    const payload = formatPayloadToApi('stopwatches', { id, description });
    yield put(updateDatabase({ data: payload }));
    //

    const response = yield call(updateStopwatchPromise, payload);
    yield put(updateDatabase({ data: response.data }));
  } catch (error) {
    yield put(updateStopwatchFailed(extractApiErrors(error)));
  }
}

function* resetStopwatchSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');

  try {
    // optimistic update
    const { id } = yield select(getStopwatch);
    const attributes = {
      id,
      activityDate: null,
      activityTotalTime: null,
      description: null,
      startedAt: null,
    };
    const payload = formatPayloadToApi('stopwatches', attributes);
    yield put(updateDatabase({ data: payload }));
    //

    const response = yield call(updateStopwatchPromise, payload);
    yield put(updateDatabase({ data: response.data }));
  } catch (error) {
    yield put(updateStopwatchFailed(extractApiErrors(error)));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(START_STOPWATCH_REQUESTED, startStopwatchSaga);
  yield takeLatest(PAUSE_STOPWATCH_REQUESTED, pauseStopwatchSaga);
  yield takeLatest(READ_STOPWATCH_REQUESTED, readStopwatchSaga);
  yield takeLatest(RESET_STOPWATCH_REQUESTED, resetStopwatchSaga);
  yield takeLatest(SET_STOPWATCH_HOURS_REQUESTED, setStopwatchHoursSaga);
  yield takeLatest(SET_STOPWATCH_MINUTES_REQUESTED, setStopwatchMinutesSaga);
  yield takeLatest(SET_ACTIVITY_DATE_REQUESTED, setActivityDateSaga);
  yield takeLatest(SET_ACTIVITY_PROJECT_REQUESTED, setActivityProjectSaga);
  yield takeLatest(SET_ACTIVITY_DESCRIPTION_REQUESTED, setActivityDescriptionSaga);
}
