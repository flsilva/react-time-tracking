import normalize from 'json-api-normalizer';
import { entities as projectEntitiesReducer } from './projects/ProjectReducers';
import { UPDATE_DATABASE as UPDATE_PROJECTS_DATABASE } from './projects/ProjectActions';
import { entities as userEntitiesReducer } from './users/UserReducers';
import { UPDATE_DATABASE as UPDATE_USERS_DATABASE } from './users/UserActions';
import { entity as stopwatchEntityReducer } from './stopwatch/StopwatchReducers';
import { UPDATE_DATABASE as UPDATE_STOPWATCH_DATABASE } from './stopwatch/StopwatchActions';

// export const CLEAR_DATABASE = 'CLEAR_DATABASE';
// export const UPDATE_DATABASE = 'UPDATE_DATABASE';

const entityReducers = {
  projects: {
    reducer: projectEntitiesReducer,
    updateDbAction: UPDATE_PROJECTS_DATABASE,
  },
  stopwatches: {
    reducer: stopwatchEntityReducer,
    updateDbAction: UPDATE_STOPWATCH_DATABASE,
  },
  users: {
    reducer: userEntitiesReducer,
    updateDbAction: UPDATE_USERS_DATABASE,
  },
};

export default (state = {}, action) => {
  switch (action.type) {
      // case UPDATE_DATABASE: {
    case UPDATE_PROJECTS_DATABASE:
    case UPDATE_STOPWATCH_DATABASE:
    case UPDATE_USERS_DATABASE: {
      const normalizedData = normalize(action.payload.data);
      console.log('DatabaseReducers() - UPDATE_DATABASE - action.type: ', action.type);
      console.log('DatabaseReducers() - UPDATE_DATABASE - action.payload.data: ', action.payload.data);
      console.log('normalizedData: ', normalizedData);

      // reconsider if it wouldn't be better to have this static:
      // return {
      //   ...state,
      //   ...{
      //     projects: projectEntitiesReducer(state.projects, normalizedData.projects),
      //     users: userEntitiesReducer(state.users, normalizedData.users),
      //   }
      // }
      return Object.keys(normalizedData)
        .filter(entityType => entityReducers[entityType])
        .reduce((database, entityType) => ({
          ...state,
          ...database,
          ...{
            [entityType]:
              entityReducers[entityType].reducer(state[entityType], {
                type: entityReducers[entityType].updateDbAction,
                payload: normalizedData[entityType],
              }),
          },
        }), {});
    }

    /*
    case CLEAR_DATABASE:
      return {};
    */

    default:
      return state;
  }
};
