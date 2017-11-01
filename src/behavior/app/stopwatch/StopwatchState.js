import isString from 'lodash/isString';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import build from 'redux-object';
import isDate from 'date-fns/is_date';
import {
  READ_ENTITY_STARTED,
  READ_ENTITY_SUCCEEDED,
  READ_ENTITY_FAILED,
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
    case READ_ENTITY_FAILED:
      return action.payload || null;

    case READ_ENTITY_STARTED:
    case READ_ENTITY_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

const isConnecting = (state = false, action) => {
  switch (action.type) {
    case READ_ENTITY_SUCCEEDED:
    case READ_ENTITY_FAILED:
      return false;

    case READ_ENTITY_STARTED:
      return true;

    default:
      return state;
  }
};

export default combineReducers({
  error,
  isConnecting,
});
