import { combineReducers } from 'redux';
import {
  SIGN_OUT_STARTED,
  SIGN_OUT_SUCCEEDED,
  SIGN_OUT_FAILED,
} from './SignOutActions';

const isConnecting = (state = null, action) => {
  switch (action.type) {
    case SIGN_OUT_STARTED:
      return true;

    case SIGN_OUT_SUCCEEDED:
    case SIGN_OUT_FAILED:
      return false;

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case SIGN_OUT_FAILED:
      return action.payload || null;

    case SIGN_OUT_STARTED:
    case SIGN_OUT_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  isConnecting,
  error,
});
