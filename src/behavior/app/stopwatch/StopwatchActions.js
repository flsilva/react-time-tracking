import { put, select, takeLatest } from 'redux-saga/effects';
import addSeconds from 'date-fns/add_seconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import isDate from 'date-fns/is_date';
import { getStopwatch } from './StopwatchState';

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

const generatePatchHttpRequest = (id, payload = {}) => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    entity: {
      type: 'stopwatches',
    },
    request: {
      data: { ...payload, id },
      method: 'PATCH',
      params: {
        include: 'author,project',
      },
      url: `stopwatches/${id}`,
    },
  };
};

export const readStopwatch = killCache => ({
  type: READ_STOPWATCH_REQUESTED,
  meta: {
    http: {
      killCache,
      request: {
        method: 'GET',
        url: 'stopwatches/',
      },
    },
  },
});

const readStopwatchStarted = () => ({ type: READ_STOPWATCH_STARTED });
const readStopwatchSucceeded = payload => ({ type: READ_STOPWATCH_SUCCEEDED, payload });
const readStopwatchFailed = payload => ({ type: READ_STOPWATCH_FAILED, payload });

export const updateStopwatchFailed = payload => ({ type: UPDATE_STOPWATCH_FAILED, payload });

export const startStopwatch = (id) => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    type: START_STOPWATCH_REQUESTED,
    meta: {
      http: generatePatchHttpRequest(id, { startedAt: new Date() }),
    },
  };
};

export const pauseStopwatch = ({ id, startedAt, activityTotalTime = 0 }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (!startedAt) throw new Error('Argument <startedAt> must not be null.');
  if (isNaN(activityTotalTime)) throw new Error('Argument <activityTotalTime> must be an integer.');

  return {
    type: PAUSE_STOPWATCH_REQUESTED,
    meta: {
      http: generatePatchHttpRequest(id, {
        activityTotalTime: (activityTotalTime + differenceInSeconds(new Date(), startedAt)),
        startedAt: null,
      }),
    },
  };
};

export const setStopwatchHours = ({ id, startedAt, activityTotalTime = 0, hours = 0 }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (isNaN(activityTotalTime)) throw new Error('Argument <activityTotalTime> must be an integer.');

  if (isNaN(hours)) {
    throw new Error('Argument <hours> must be an integer.');
  }

  const currentHours = getTime(startedAt, activityTotalTime).hours;

  let newActivityTotalTime = activityTotalTime;
  if (hours > currentHours) {
    newActivityTotalTime += (hours - currentHours) * 3600;
  } else {
    newActivityTotalTime -= (currentHours - hours) * 3600;
  }

  return {
    type: SET_STOPWATCH_HOURS_REQUESTED,
    meta: {
      http: generatePatchHttpRequest(id, {
        activityTotalTime: newActivityTotalTime,
      }),
    },
  };
};

export const setStopwatchMinutes = ({ id, startedAt, activityTotalTime = 0, minutes = 0 }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (isNaN(activityTotalTime)) throw new Error('Argument <activityTotalTime> must be an integer.');

  if (isNaN(minutes)) {
    throw new Error('Argument <minutes> must be an integer.');
  }

  const currentMinutes = getTime(startedAt, activityTotalTime).minutes;

  let newActivityTotalTime = activityTotalTime;
  if (minutes > currentMinutes) {
    newActivityTotalTime += (minutes - currentMinutes) * 60;
  } else {
    newActivityTotalTime -= (currentMinutes - minutes) * 60;
  }

  return {
    type: SET_STOPWATCH_MINUTES_REQUESTED,
    meta: {
      http: generatePatchHttpRequest(id, {
        activityTotalTime: newActivityTotalTime,
      }),
    },
  };
};

export const setActivityDate = ({ id, date }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (!date) throw new Error('Argument <date> must not be null.');
  if (!isDate(date)) {
    throw new Error('Argument <date> must be a Date object.');
  }

  return {
    type: SET_ACTIVITY_DATE_REQUESTED,
    meta: {
      http: generatePatchHttpRequest(id, { activityDate: date }),
    },
  };
};

export const setActivityProject = ({ id, projectId }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (!projectId) throw new Error('Argument <projectId> must not be null.');

  return {
    type: SET_ACTIVITY_PROJECT_REQUESTED,
    meta: {
      http: {
        ...generatePatchHttpRequest(id),
        ...{
          entity: {
            type: 'stopwatches',
            relationships: [
              { attrName: 'project', type: 'projects', id: projectId },
            ],
          },
        },
      },
    },
  };
};

export const setActivityDescription = ({ id, description }) => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    type: SET_ACTIVITY_DESCRIPTION_REQUESTED,
    meta: {
      http: generatePatchHttpRequest(id, { description }),
    },
  };
};

export const resetStopwatch = (id) => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    type: RESET_STOPWATCH_REQUESTED,
    meta: {
      http: generatePatchHttpRequest(id, {
        activityDate: null,
        activityTotalTime: null,
        description: null,
        startedAt: null,
      }),
    },
  };
};

const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

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
    yield put(updateDatabase({ data: request.data }));
    //

    const data = yield makeRequest(request);
    yield put(updateDatabase(data));
  } catch (error) {
    yield put(updateStopwatchFailed(error));
  }
}

export function* bindActionsToSagas() {
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
