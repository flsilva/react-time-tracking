import normalize from 'json-api-normalizer';
import merge from 'lodash/merge';

export const CLEAR_DATABASE = 'CLEAR_DATABASE';
export const READ_ENTITIES_SUCCESS = 'READ_ENTITIES_SUCCESS';

export default (state = {}, action) => {
  switch (action.type) {
    case READ_ENTITIES_SUCCESS:
      console.log('DatabaseReducers() - READ_ENTITIES_SUCCESS - action.payload.data: ', action.payload.data);
      console.log('DatabaseReducers() - READ_ENTITIES_SUCCESS - normalize(action.payload.data): ', normalize(action.payload.data));
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
