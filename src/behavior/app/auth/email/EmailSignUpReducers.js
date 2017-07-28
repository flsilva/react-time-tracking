import { combineReducers } from 'redux';
import {
  EMAIL_SIGN_UP_START,
  EMAIL_SIGN_UP_SUCCESS,
  EMAIL_SIGN_UP_ERROR,
} from './EmailSignUpActions';

const isFetching = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_UP_START:
      return true;

    case EMAIL_SIGN_UP_SUCCESS:
    case EMAIL_SIGN_UP_ERROR:
      return false;

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_UP_ERROR:
      return action.payload || null;

    case EMAIL_SIGN_UP_START:
    case EMAIL_SIGN_UP_SUCCESS:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  error,
});
