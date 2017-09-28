import { call, put, select, takeLatest } from 'redux-saga/effects';
import addSeconds from 'date-fns/add_seconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import isDate from 'date-fns/is_date';
import humps from 'humps';
import { getStopwatch } from './TimerReducers';
import { getFetcher } from '../api/ApiConfig';
import { extractApiErrors } from '../api/ApiErrors';

export const SET_ACTIVITY_DATE_REQUESTED = 'app/timer/set/date/requested';
export const SET_STOPWATCH_HOURS_REQUESTED = 'app/timer/set/hours/requested';
export const SET_STOPWATCH_MINUTES_REQUESTED = 'app/timer/set/minutes/requested';
export const SET_ACTIVITY_PROJECT_REQUESTED = 'app/timer/set/project/requested';
export const READ_STOPWATCH_REQUESTED = 'app/timer/read/requested';
export const READ_STOPWATCH_STARTED = 'app/timer/read/started';
export const READ_STOPWATCH_SUCCEEDED = 'app/timer/read/succeeded';
export const READ_STOPWATCH_FAILED = 'app/timer/read/failed';
export const PAUSE_STOPWATCH_REQUESTED = 'app/timer/pause/requested';
export const START_STOPWATCH_REQUESTED = 'app/timer/start/requested';
export const UPDATE_DATABASE = 'app/timer/update/database';

export const readStopwatch = () => ({ type: READ_STOPWATCH_REQUESTED });
const readStopwatchStarted = () => ({ type: READ_STOPWATCH_STARTED });
const readStopwatchSucceeded = payload => ({ type: READ_STOPWATCH_SUCCEEDED, payload });
const readStopwatchFailed = payload => ({ type: READ_STOPWATCH_FAILED, payload });

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

const updateStopwatchPromise = (data) => {
  const opts = {
    body: JSON.stringify(humps.decamelizeKeys(data, { separator: '-' })),
    method: 'PATCH',
  };

  const path = `stopwatches/${data.data.id}?include=author,project`;

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

const readStopwatchPromise = () => {
  const opts = {
    method: 'GET',
  };

  const path = 'stopwatches';

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* readStopwatchSaga() {
  try {
    yield put(readStopwatchStarted());

    const data = yield call(readStopwatchPromise);

    yield put(updateDatabase({ data }));
    yield put(readStopwatchSucceeded({ data }));
  } catch (error) {
    console.log('readStopwatchSaga().catch() - error: ', error);
    yield put(readStopwatchFailed(extractApiErrors(error)));
  }
}

function* startStopwatchSaga() {
  try {
    // yield put(readStopwatchStarted());

    // optimistic update
    const stopwatch = yield select(getStopwatch);

    const payload = {
      data: {
        id: stopwatch.id,
        type: 'stopwatches',
        attributes: {
          startedAt: new Date(),
        },
      },
    };

    // stopwatch.isRunning = true;
    // stopwatch.startedAt = new Date();

    // yield put(updateDatabase({ attributes: stopwatch }));
    // yield put(updateDatabase({ data: updates }));
    yield put(updateDatabase({ data: payload }));
    //

    // const data = yield call(startStopwatchPromise);
    const data = yield call(updateStopwatchPromise, payload);

    yield put(updateDatabase({ data }));
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

    const activityTotalTime = stopwatch.activityTotalTime + differenceInSeconds(new Date(), stopwatch.startedAt);

    const payload = {
      data: {
        id: stopwatch.id,
        type: 'stopwatches',
        attributes: {
          activityTotalTime,
          startedAt: null,
        },
      },
    };

    yield put(updateDatabase({ data: payload }));
    //

    // const data = yield call(pauseStopwatchPromise);
    const data = yield call(updateStopwatchPromise, payload);

    yield put(updateDatabase({ data }));
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

    let activityTotalTime = stopwatch.activityTotalTime;
    if (hours > currentHours) {
      activityTotalTime += (hours - currentHours) * 3600;
    } else {
      activityTotalTime -= (currentHours - hours) * 3600;
    }

    const payload = {
      data: {
        id: stopwatch.id,
        type: 'stopwatches',
        attributes: {
          activityTotalTime,
        },
      },
    };

    yield put(updateDatabase({ data: payload }));
    //

    // const data = yield call(setStopwatchHourPromise);
    const data = yield call(updateStopwatchPromise, payload);

    yield put(updateDatabase({ data }));
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

    let activityTotalTime = stopwatch.activityTotalTime;
    if (minutes > currentMinutes) {
      activityTotalTime += (minutes - currentMinutes) * 60;
    } else {
      activityTotalTime -= (currentMinutes - minutes) * 60;
    }

    const payload = {
      data: {
        id: stopwatch.id,
        type: 'stopwatches',
        attributes: {
          activityTotalTime,
        },
      },
    };

    yield put(updateDatabase({ data: payload }));
    //

    // const data = yield call(setStopwatchHourPromise);
    const data = yield call(updateStopwatchPromise, payload);

    yield put(updateDatabase({ data }));
    // yield put(setStopwatchHourSucceeded({ data }));
  } catch (error) {
    // yield put(setStopwatchHourFailed(extractApiErrors(error)));
  }
}

function* setActivityDateSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!isDate(action.payload)) {
    throw new Error('Argument <action.payload> must be a Date object.');
  }

  try {
    // yield put(setActivityDateStarted());

    // optimistic update
    const stopwatch = yield select(getStopwatch);

    const payload = {
      data: {
        id: stopwatch.id,
        type: 'stopwatches',
        attributes: {
          activityDate: action.payload,
        },
      },
    };

    yield put(updateDatabase({ data: payload }));
    //

    const data = yield call(updateStopwatchPromise, payload);

    yield put(updateDatabase({ data }));
    // yield put(setActivityDateSucceeded({ data }));
  } catch (error) {
    // yield put(setActivityDateFailed(extractApiErrors(error)));
  }
}

function* setActivityProjectSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must be a String ID.');

  try {
    // yield put(setActivityDateStarted());

    // optimistic update
    const stopwatch = yield select(getStopwatch);

    const payload = {
      data: {
        id: stopwatch.id,
        type: 'stopwatches',
        relationships: {
          project: {
            data: {
              id: action.payload,
              type: 'projects',
            },
          },
        },
      },
    };

    yield put(updateDatabase({ data: payload }));
    //

    const data = yield call(updateStopwatchPromise, payload);

    yield put(updateDatabase({ data }));
    // yield put(setActivityDateSucceeded({ data }));
  } catch (error) {
    // yield put(setActivityDateFailed(extractApiErrors(error)));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(READ_STOPWATCH_REQUESTED, readStopwatchSaga);
  yield takeLatest(START_STOPWATCH_REQUESTED, startStopwatchSaga);
  yield takeLatest(PAUSE_STOPWATCH_REQUESTED, pauseStopwatchSaga);
  yield takeLatest(SET_STOPWATCH_HOURS_REQUESTED, setStopwatchHoursSaga);
  yield takeLatest(SET_STOPWATCH_MINUTES_REQUESTED, setStopwatchMinutesSaga);
  yield takeLatest(SET_ACTIVITY_DATE_REQUESTED, setActivityDateSaga);
  yield takeLatest(SET_ACTIVITY_PROJECT_REQUESTED, setActivityProjectSaga);
}
