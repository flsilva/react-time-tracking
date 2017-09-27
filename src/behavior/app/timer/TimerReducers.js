import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import humps from 'humps';
import {
  UPDATE_DATABASE,
} from './TimerActions';

export const data = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE: {
      console.log('TimerReducers().data() - UPDATE_DATABASE - action.payload: ', action.payload);
      const newState = humps.camelizeKeys(action.payload.attributes);
      const { startedAt } = newState;

      if (startedAt) newState.startedAt = new Date(startedAt);
      return merge({ ...state }, newState);
    }

    default:
      return state;
  }
};

export const getStopwatch = state => state.timer.data;

export default combineReducers({
  data,
});
