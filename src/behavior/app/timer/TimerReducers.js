import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import build from 'redux-object';
import {
  UPDATE_DATABASE,
} from './TimerActions';

export const data = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge({ ...state }, action.payload);

    default:
      return state;
  }
};

export const readEntityById = (state, id) => {
  if (!id) return null;
  return build(state.database, 'timers', id, { eager: true, ignoreLinks: true });
};

export default combineReducers({
  data,
});
