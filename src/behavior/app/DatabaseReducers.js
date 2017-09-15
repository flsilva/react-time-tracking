import normalize from 'json-api-normalizer';
import merge from 'lodash/merge';

export const CLEAR_DATABASE = 'CLEAR_DATABASE';
export const READ_ENTITIES_SUCCESS = 'READ_ENTITIES_SUCCESS';

export default (state = {}, action) => {
  switch (action.type) {
    case READ_ENTITIES_SUCCESS:
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
