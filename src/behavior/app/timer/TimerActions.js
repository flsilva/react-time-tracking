import { call, put, select, takeLatest } from 'redux-saga/effects';
import addSeconds from 'date-fns/add_seconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import { getFetcher } from '../api/ApiConfig';
import { getStopwatch } from './TimerReducers';

export const PICK_DATE = 'app/timer/pick/date/requested';
export const PICK_HOUR = 'app/timer/pick/hour/requested';
export const PICK_MINUTE = 'app/timer/pick/minute/requested';
export const PICK_PROJECT = 'app/timer/pick/project/requested';
export const READ_STOPWATCH_REQUESTED = 'app/timer/read/requested';
export const PAUSE_STOPWATCH_REQUESTED = 'app/timer/pause/requested';
export const START_STOPWATCH_REQUESTED = 'app/timer/start/requested';
export const UPDATE_DATABASE = 'app/timer/update/database';

export const readStopwatch = () => ({ type: READ_STOPWATCH_REQUESTED });
export const startStopwatch = () => ({ type: START_STOPWATCH_REQUESTED });
export const pauseStopwatch = () => ({ type: PAUSE_STOPWATCH_REQUESTED });

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
// export const pickHour = () => ({ type: PICK_HOUR });
export const pickHour = hours => (dispatch, getState) => {
  const data = { ...getState().timer.data };
  const currentHours = getTime(data.startedAt, data.activityTotalTime).hours;

  if (hours === currentHours) return;

  if (hours > currentHours) {
    data.activityTotalTime += (hours - currentHours) * 3600;
  } else {
    data.activityTotalTime -= (currentHours - hours) * 3600;
  }

  dispatch(updateDatabase(data));
};
// export const pickMinute = () => ({ type: PICK_MINUTE });

export const pickMinute = minutes => (dispatch, getState) => {
  const data = { ...getState().timer.data };
  const currentMinutes = getTime(data.startedAt, data.activityTotalTime).minutes;

  if (minutes === currentMinutes) return;

  if (minutes > currentMinutes) {
    data.activityTotalTime += (minutes - currentMinutes) * 60;
  } else {
    data.activityTotalTime -= (currentMinutes - minutes) * 60;
  }

  dispatch(updateDatabase(data));
};

export const pickProject = () => ({ type: PICK_PROJECT });

const startStopwatchPromise = () => {
  const opts = {
    method: 'PATCH',
  };

  const path = 'stopwatch/start';

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

    const data = yield call(startStopwatchPromise);

    yield put(updateDatabase(data.data));
    // yield put(readStopwatchSucceeded({ data }));
  } catch (error) {
    // yield put(readStopwatchFailed(extractApiErrors(error)));
  }
}

const pauseStopwatchPromise = () => {
  const opts = {
    method: 'PATCH',
  };

  const path = 'stopwatch/pause';

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

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

    const data = yield call(pauseStopwatchPromise);

    yield put(updateDatabase(data.data));
    // yield put(pauseStopwatchSucceeded({ data }));
  } catch (error) {
    // yield put(pauseStopwatchFailed(extractApiErrors(error)));
  }
}

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

export function* bindActionsToSagas() {
  yield takeLatest(READ_STOPWATCH_REQUESTED, readStopwatchSaga);
  yield takeLatest(START_STOPWATCH_REQUESTED, startStopwatchSaga);
  yield takeLatest(PAUSE_STOPWATCH_REQUESTED, pauseStopwatchSaga);
}
