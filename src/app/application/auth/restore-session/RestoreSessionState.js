import { combineReducers } from 'redux';
import {
  RESTORE_SESSION_STARTED,
  RESTORE_SESSION_SUCCEEDED,
  RESTORE_SESSION_FAILED,
} from './RestoreSessionActions';

const isConnecting = (state = false, action) => {
  switch (action.type) {
    case RESTORE_SESSION_STARTED:
      return true;

    case RESTORE_SESSION_SUCCEEDED:
    case RESTORE_SESSION_FAILED:
      return false;

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case RESTORE_SESSION_FAILED:
      return action.payload || null;

    case RESTORE_SESSION_STARTED:
    case RESTORE_SESSION_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  isConnecting,
  error,
});
