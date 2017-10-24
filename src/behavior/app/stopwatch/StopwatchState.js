import isString from 'lodash/isString';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import build from 'redux-object';
import isDate from 'date-fns/is_date';
import {
  READ_STOPWATCH_STARTED,
  READ_STOPWATCH_SUCCEEDED,
  READ_STOPWATCH_FAILED,
  UPDATE_DATABASE,
} from './StopwatchActions';

export const entity = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge({ ...state }, action.payload);

    default:
      return state;
  }
};

export const getStopwatch = (state) => {
  const stopwatches = state.database.stopwatches;
  if (!stopwatches) return null;

  const id = Object.keys(stopwatches)[0];

  const stopwatch = build(state.database, 'stopwatches', id, {
    eager: true,
    ignoreLinks: true,
  });

  const { activityDate, startedAt } = stopwatch;
  if (activityDate) stopwatch.activityDate = new Date(activityDate);
  if (startedAt && isString(startedAt)) stopwatch.startedAt = new Date(startedAt);
  stopwatch.isRunning = isDate(stopwatch.startedAt);

  return stopwatch;
};

const error = (state = null, action) => {
  switch (action.type) {
    case READ_STOPWATCH_FAILED:
      return action.payload || null;

    case READ_STOPWATCH_STARTED:
    case READ_STOPWATCH_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

const isConnecting = (state = false, action) => {
  switch (action.type) {
    case READ_STOPWATCH_SUCCEEDED:
    case READ_STOPWATCH_FAILED:
      return false;

    case READ_STOPWATCH_STARTED:
      return true;

    default:
      return state;
  }
};

export default combineReducers({
  error,
  isConnecting,
});
