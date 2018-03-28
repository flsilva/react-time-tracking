import { combineReducers } from 'redux';
import {
  EMAIL_SIGN_IN_STARTED,
  EMAIL_SIGN_IN_SUCCEEDED,
  EMAIL_SIGN_IN_FAILED,
} from './EmailSignInActions';

const isConnecting = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_IN_STARTED:
      return true;

    case EMAIL_SIGN_IN_SUCCEEDED:
    case EMAIL_SIGN_IN_FAILED:
      return false;

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_IN_FAILED:
      return action.payload || null;

    case EMAIL_SIGN_IN_STARTED:
    case EMAIL_SIGN_IN_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  isConnecting,
  error,
});
