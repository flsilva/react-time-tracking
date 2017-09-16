import merge from 'lodash/merge';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './User.Actions';
import { SIGN_OUT_SUCCESS } from '../auth/sign-out/SignOutActions';

export const UPDATE_DATABASE = 'UPDATE_DATABASE';

export const entities = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge(state, action.payload);

    case SIGN_OUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

export default (state = {}, action) => {
  console.log('User.Reducers().users()');
  console.log('state:', state);
  console.log('action:', action);

  switch (action.type) {
    case USER_LOGGED_IN:
      return action.payload;

    case USER_LOGGED_OUT:
      return {};

    default:
      return state;
  }
};
