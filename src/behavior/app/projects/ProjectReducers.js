import {
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  GET_PROJECTS_SUCCESS,
} from './ProjectActions';

import { SIGN_OUT_SUCCESS } from '../auth/sign-out/SignOutActions';

const project = (state = null, action) => {
  // eslint-disable-next-line no-console
  console.log('ProjectReducers().project() - state: ', state);
  console.log('ProjectReducers().project() - action: ', action);

  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const projects = (state = {}, action) => {
  // eslint-disable-next-line no-console
  console.log('ProjectReducers().projects() - state: ', state);
  // eslint-disable-next-line no-console
  console.log('ProjectReducers().projects() - action: ', action);

  // this is needed when we access the app through
  // /app/projects/new route directly, skipping data loading,
  // so state.data === null, throwing an error when merging new projects.
  if (!state.data) state.data = [];

  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      // eslint-disable-next-line no-console
      console.log('ProjectReducers().projects() - case ADD_PROJECT_SUCCESS');
      
      return {
        data: [
          ...state.data,
          project(undefined, action),
        ],
      };
    case ADD_PROJECT_ERROR:
      // eslint-disable-next-line no-console
      console.log('ProjectReducers() - case ADD_PROJECT_ERROR');
      return Object.assign({}, state, { error: action.payload });
    case GET_PROJECTS_SUCCESS:
      return {
        data: action.payload,
      };
    case SIGN_OUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default projects;
