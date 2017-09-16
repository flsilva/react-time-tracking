import normalize from 'json-api-normalizer';
import merge from 'lodash/merge';

export const CLEAR_DATABASE = 'CLEAR_DATABASE';

export const UPDATE_DATABASE = 'UPDATE_DATABASE';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE:
      console.log('DatabaseReducers() - UPDATE_DATABASE - action.payload.data: ', action.payload.data);
      console.log('DatabaseReducers() - UPDATE_DATABASE - normalize(action.payload.data): ', normalize(action.payload.data));
      return merge(
        state,
        normalize(action.payload.data),
      );

    case CLEAR_DATABASE:
      return null;

    default:
      return state;
  }
};
