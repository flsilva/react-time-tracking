import isDate from 'date-fns/is_date';
import {
  changeElapsedHours,
  changeElapsedMinutes,
  getElapsedTimeInSeconds,
} from './StopwatchUtils';

//---------------------
// BEGIN CRUD CONSTANTS
//---------------------

/* users cannot create or delete stopwatches */

export const READ_STOPWATCH_REQUESTED = 'app/stopwatch/read/requested';
export const READ_STOPWATCH_STARTED = 'app/stopwatch/read/started';
export const READ_STOPWATCH_SUCCEEDED = 'app/stopwatch/read/succeeded';
export const READ_STOPWATCH_FAILED = 'app/stopwatch/read/failed';
export const UPDATE_STOPWATCH_FAILED = 'app/stopwatch/update/failed';

//-------------------
// END CRUD CONSTANTS
//-------------------

//--------------------------------------------
// BEGIN UPDATE INDIVIDUAL ATTRIBUTE CONSTANTS
//--------------------------------------------

export const PAUSE_STOPWATCH_REQUESTED = 'app/stopwatch/pause/requested';
export const RESET_STOPWATCH_REQUESTED = 'app/stopwatch/reset/requested';
export const SET_STOPWATCH_DATE_REQUESTED = 'app/stopwatch/set/date/requested';
export const SET_STOPWATCH_DESCRIPTION_REQUESTED = 'app/stopwatch/set/description/requested';
export const SET_STOPWATCH_HOURS_REQUESTED = 'app/stopwatch/set/hours/requested';
export const SET_STOPWATCH_MINUTES_REQUESTED = 'app/stopwatch/set/minutes/requested';
export const SET_STOPWATCH_PROJECT_REQUESTED = 'app/stopwatch/set/project/requested';
export const START_STOPWATCH_REQUESTED = 'app/stopwatch/start/requested';

//------------------------------------------
// END UPDATE INDIVIDUAL ATTRIBUTE CONSTANTS
//------------------------------------------

export const UPDATE_DATABASE = 'app/stopwatch/update/database';

//-------------------
// BEGIN CRUD ACTIONS
//-------------------

/* users cannot create or delete stopwatches */

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

export const readStopwatchStarted = () => ({ type: READ_STOPWATCH_STARTED });
export const readStopwatchSucceeded = payload => ({ type: READ_STOPWATCH_SUCCEEDED, payload });
export const readStopwatchFailed = payload => ({ type: READ_STOPWATCH_FAILED, payload });

const generateUpdateRequest = (id, payload = {}) => {
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

export const updateStopwatchFailed = payload => ({ type: UPDATE_STOPWATCH_FAILED, payload });

//-----------------
// END CRUD ACTIONS
//-----------------

//------------------------------------------
// BEGIN UPDATE INDIVIDUAL ATTRIBUTE ACTIONS
//------------------------------------------

export const pauseStopwatch = ({ id, startedAt, activityTotalTime = 0 }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (!startedAt) throw new Error('Argument <startedAt> must not be null.');
  if (isNaN(activityTotalTime)) throw new Error('Argument <activityTotalTime> must be an integer.');

  return {
    type: PAUSE_STOPWATCH_REQUESTED,
    meta: {
      http: generateUpdateRequest(id, {
        activityTotalTime: getElapsedTimeInSeconds(startedAt, new Date(), activityTotalTime),
        startedAt: null,
      }),
    },
  };
};

export const resetStopwatch = (id) => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    type: RESET_STOPWATCH_REQUESTED,
    meta: {
      http: generateUpdateRequest(id, {
        activityDate: null,
        activityTotalTime: null,
        description: null,
        startedAt: null,
      }),
    },
  };
};

export const setStopwatchDate = ({ id, date }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (!date) throw new Error('Argument <date> must not be null.');
  if (!isDate(date)) {
    throw new Error('Argument <date> must be a Date object.');
  }

  return {
    type: SET_STOPWATCH_DATE_REQUESTED,
    meta: {
      http: generateUpdateRequest(id, { activityDate: date }),
    },
  };
};

export const setStopwatchDescription = ({ id, description }) => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    type: SET_STOPWATCH_DESCRIPTION_REQUESTED,
    meta: {
      http: generateUpdateRequest(id, { description }),
    },
  };
};

export const setStopwatchHours = ({ id, activityTotalTime = 0, hours = 0, startedAt }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (isNaN(activityTotalTime)) throw new Error('Argument <activityTotalTime> must be an integer.');

  if (isNaN(hours)) {
    throw new Error('Argument <hours> must be an integer.');
  }

  return {
    type: SET_STOPWATCH_HOURS_REQUESTED,
    meta: {
      http: generateUpdateRequest(id, {
        activityTotalTime: changeElapsedHours(startedAt, hours, activityTotalTime),
      }),
    },
  };
};

export const setStopwatchMinutes = ({ id, activityTotalTime = 0, minutes = 0, startedAt }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (isNaN(activityTotalTime)) throw new Error('Argument <activityTotalTime> must be an integer.');

  if (isNaN(minutes)) {
    throw new Error('Argument <minutes> must be an integer.');
  }

  return {
    type: SET_STOPWATCH_MINUTES_REQUESTED,
    meta: {
      http: generateUpdateRequest(id, {
        activityTotalTime: changeElapsedMinutes(startedAt, minutes, activityTotalTime),
      }),
    },
  };
};

export const setStopwatchProject = ({ id, projectId }) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (!projectId) throw new Error('Argument <projectId> must not be null.');

  return {
    type: SET_STOPWATCH_PROJECT_REQUESTED,
    meta: {
      http: {
        ...generateUpdateRequest(id),
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

export const startStopwatch = (id) => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    type: START_STOPWATCH_REQUESTED,
    meta: {
      http: generateUpdateRequest(id, { startedAt: new Date() }),
    },
  };
};

//----------------------------------------
// END UPDATE INDIVIDUAL ATTRIBUTE ACTIONS
//----------------------------------------

export const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });
