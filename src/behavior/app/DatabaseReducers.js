import normalize from 'json-api-normalizer';
import { byId } from './projects/ProjectReducers';
import { entities as userEntitiesReducer } from './users/User.Reducers';

export const CLEAR_DATABASE = 'CLEAR_DATABASE';

export const UPDATE_DATABASE = 'UPDATE_DATABASE';

const entityReducers = {
  projects: byId,
  users: userEntitiesReducer,
};

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE: {
      const normalizedData = normalize(action.payload.data);
      // console.log('DatabaseReducers() - UPDATE_DATABASE - normalizedData: ', normalizedData);

      return Object.keys(normalizedData)
        .filter(entityType => entityReducers[entityType])
        .reduce((database, entityType) => ({
          ...state,
          ...database,
          ...{
            [entityType]:
              entityReducers[entityType](state[entityType], {
                type: UPDATE_DATABASE, payload: normalizedData[entityType],
              }),
          },
        }), {});
    }

    case CLEAR_DATABASE:
      return {};

    default:
      return state;
  }
};
