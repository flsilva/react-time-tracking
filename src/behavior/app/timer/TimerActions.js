import { call, put, select, takeLatest } from 'redux-saga/effects';
import addSeconds from 'date-fns/add_seconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import humps from 'humps';
import { getFetcher } from '../api/ApiConfig';
import { getStopwatch } from './TimerReducers';

export const PICK_DATE = 'app/timer/pick/date/requested';
export const SET_STOPWATCH_HOURS_REQUESTED = 'app/timer/set/hours/requested';
export const SET_STOPWATCH_MINUTES_REQUESTED = 'app/timer/set/minutes/requested';
export const PICK_PROJECT = 'app/timer/pick/project/requested';
export const READ_STOPWATCH_REQUESTED = 'app/timer/read/requested';
export const PAUSE_STOPWATCH_REQUESTED = 'app/timer/pause/requested';
export const START_STOPWATCH_REQUESTED = 'app/timer/start/requested';
export const UPDATE_DATABASE = 'app/timer/update/database';

export const readStopwatch = () => ({ type: READ_STOPWATCH_REQUESTED });
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

const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

export const pickDate = () => ({ type: PICK_DATE });
export const pickProject = () => ({ type: PICK_PROJECT });

const readStopwatchPromise = () => {
  const opts = {
    method: 'GET',
  };

  const path = 'stopwatch';

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* readStopwatchSaga() {
  try {
    // yield put(readStopwatchStarted());

    const data = yield call(readStopwatchPromise);

    yield put(updateDatabase(data.data));
    // yield put(readStopwatchSucceeded({ data }));
  } catch (error) {
    console.log('readStopwatchSaga().catch() - error: ', error);
    // yield put(readStopwatchFailed(extractApiErrors(error)));
  }
}

const updateStopwatchPromise = (data) => {
  const opts = {
    body: JSON.stringify(humps.decamelizeKeys({ stopwatch: data })),
    method: 'PATCH',
  };

  const path = 'stopwatch';

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* startStopwatchSaga() {
  try {
    // yield put(readStopwatchStarted());

    // optimistic update
    const stopwatch = yield select(getStopwatch);

    stopwatch.isRunning = true;
    stopwatch.startedAt = new Date();

    yield put(updateDatabase({ attributes: stopwatch }));
    //

    // const data = yield call(startStopwatchPromise);
    const data = yield call(updateStopwatchPromise, { startedAt: new Date() });

    yield put(updateDatabase(data.data));
    // yield put(readStopwatchSucceeded({ data }));
  } catch (error) {
    // yield put(readStopwatchFailed(extractApiErrors(error)));
  }
}

function* pauseStopwatchSaga() {
  try {
    // yield put(pauseStopwatchStarted());

    // optimistic update
    const stopwatch = yield select(getStopwatch);

    stopwatch.activityTotalTime += differenceInSeconds(new Date(), stopwatch.startedAt);
    stopwatch.isRunning = false;
    stopwatch.startedAt = null;

    yield put(updateDatabase({ attributes: stopwatch }));
    //

    // const data = yield call(pauseStopwatchPromise);
    const data = yield call(updateStopwatchPromise, {
      activityTotalTime: stopwatch.activityTotalTime,
      startedAt: null,
    });

    yield put(updateDatabase(data.data));
    // yield put(pauseStopwatchSucceeded({ data }));
  } catch (error) {
    // yield put(pauseStopwatchFailed(extractApiErrors(error)));
  }
}

function* setStopwatchHoursSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');

  const hours = action.payload;

  if (hours !== 0 && !hours) throw new Error('Argument <action.payload> must not be null.');
  if (isNaN(hours)) {
    throw new Error('Argument <action.payload> must be an integer.');
  }

  try {
    // yield put(setStopwatchHourStarted());

    // optimistic update
    const stopwatch = yield select(getStopwatch);
    const currentHours = getTime(stopwatch.startedAt, stopwatch.activityTotalTime).hours;

    if (hours === currentHours) return;

    if (hours > currentHours) {
      stopwatch.activityTotalTime += (hours - currentHours) * 3600;
    } else {
      stopwatch.activityTotalTime -= (currentHours - hours) * 3600;
    }

    yield put(updateDatabase({ attributes: stopwatch }));
    //

    // const data = yield call(setStopwatchHourPromise);
    const data = yield call(updateStopwatchPromise, {
      activityTotalTime: stopwatch.activityTotalTime,
    });

    yield put(updateDatabase(data.data));
    // yield put(setStopwatchHourSucceeded({ data }));
  } catch (error) {
    // yield put(setStopwatchHourFailed(extractApiErrors(error)));
  }
}

function* setStopwatchMinutesSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');

  const minutes = action.payload;

  if (minutes !== 0 && !minutes) throw new Error('Argument <action.payload> must not be null.');
  if (isNaN(minutes)) {
    throw new Error('Argument <action.payload> must be an integer.');
  }

  try {
    // yield put(setStopwatchMinutesStarted());

    // optimistic update
    const stopwatch = yield select(getStopwatch);
    const currentMinutes = getTime(stopwatch.startedAt, stopwatch.activityTotalTime).minutes;

    if (minutes === currentMinutes) return;

    if (minutes > currentMinutes) {
      stopwatch.activityTotalTime += (minutes - currentMinutes) * 60;
    } else {
      stopwatch.activityTotalTime -= (currentMinutes - minutes) * 60;
    }

    yield put(updateDatabase({ attributes: stopwatch }));
    //

    // const data = yield call(setStopwatchHourPromise);
    const data = yield call(updateStopwatchPromise, {
      activityTotalTime: stopwatch.activityTotalTime,
    });

    yield put(updateDatabase(data.data));
    // yield put(setStopwatchHourSucceeded({ data }));
  } catch (error) {
    // yield put(setStopwatchHourFailed(extractApiErrors(error)));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(READ_STOPWATCH_REQUESTED, readStopwatchSaga);
  yield takeLatest(START_STOPWATCH_REQUESTED, startStopwatchSaga);
  yield takeLatest(PAUSE_STOPWATCH_REQUESTED, pauseStopwatchSaga);
  yield takeLatest(SET_STOPWATCH_HOURS_REQUESTED, setStopwatchHoursSaga);
  yield takeLatest(SET_STOPWATCH_MINUTES_REQUESTED, setStopwatchMinutesSaga);
}
