import merge from 'lodash/merge';
import {
  UPDATE_DATABASE,
} from './UserActions';
import { SIGN_OUT_SUCCESS } from '../auth/sign-out/SignOutActions';

// eslint-disable-next-line import/prefer-default-export
export const entities = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge(state, action.payload);

    case SIGN_OUT_SUCCESS:
      return {};

    default:
      return state;
  }
};
