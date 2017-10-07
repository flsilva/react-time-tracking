import merge from 'lodash/merge';
import {
  UPDATE_DATABASE,
} from './UserActions';
import { USER_SIGN_OUT_SUCCEEDED } from '../auth/AuthActions';

// eslint-disable-next-line import/prefer-default-export
export const entities = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge({ ...state }, action.payload);

    case USER_SIGN_OUT_SUCCEEDED:
      return {};

    default:
      return state;
  }
};
