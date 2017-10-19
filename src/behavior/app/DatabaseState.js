import normalize from 'json-api-normalizer';
import { entities as projectEntitiesReducer } from './projects/ProjectState';
import { UPDATE_DATABASE as UPDATE_PROJECTS_DATABASE } from './projects/ProjectActions';
import { entities as userEntitiesReducer } from './users/UserState';
import { UPDATE_DATABASE as UPDATE_USERS_DATABASE } from './users/UserActions';
import { entity as stopwatchEntityReducer } from './stopwatch/StopwatchState';
// import { UPDATE_DATABASE as UPDATE_STOPWATCH_DATABASE } from './stopwatch/StopwatchActions';

/*
 * TODO: fix this.
 * Weird bug: commented out line above
 * import { UPDATE_DATABASE as UPDATE_STOPWATCH_DATABASE }
 * doesn't work, we get undefined as variable value.
 * If I rename StopwatchActions.js file to StopwatchActions2.js
 * and import from it it does work. Need more investigation.
 * Keeping this ugly hack for now.
 */
const UPDATE_STOPWATCH_DATABASE = 'app/stopwatch/update/database';
/**/

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
    case UPDATE_PROJECTS_DATABASE:
    case UPDATE_STOPWATCH_DATABASE:
    case UPDATE_USERS_DATABASE: {
      const normalizedData = normalize(action.payload);

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
