import merge from 'lodash/merge';
// import { combineReducers } from 'redux';
// import humps from 'humps';
import build from 'redux-object';
import isDate from 'date-fns/is_date';
import {
  UPDATE_DATABASE,
} from './TimerActions';

export const entity = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE: {
      console.log('TimerReducers().data() - UPDATE_DATABASE - action.payload: ', action.payload);
      // const newState = humps.camelizeKeys(action.payload.attributes);
      // const { activityDate, startedAt } = newState;

      // if (activityDate) newState.activityDate = new Date(activityDate);
      // if (startedAt) newState.startedAt = new Date(startedAt);
      // return merge({ ...state }, newState);
      return merge({ ...state }, action.payload);
    }

    default:
      return state;
  }
};

// export const getStopwatch = state => state.timer.data;
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
  if (startedAt) stopwatch.startedAt = new Date(startedAt);
  stopwatch.isRunning = isDate(stopwatch.startedAt);

  return stopwatch;
};

/*
export default combineReducers({
  data,
});
*/
