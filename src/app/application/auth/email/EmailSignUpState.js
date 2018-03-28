import { combineReducers } from 'redux';
import {
  EMAIL_SIGN_UP_STARTED,
  EMAIL_SIGN_UP_SUCCEEDED,
  EMAIL_SIGN_UP_FAILED,
} from './EmailSignUpActions';

const isConnecting = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_UP_STARTED:
      return true;

    case EMAIL_SIGN_UP_SUCCEEDED:
    case EMAIL_SIGN_UP_FAILED:
      return false;

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_UP_FAILED:
      return action.payload || null;

    case EMAIL_SIGN_UP_STARTED:
    case EMAIL_SIGN_UP_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  isConnecting,
  error,
});
