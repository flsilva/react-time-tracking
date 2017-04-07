import { 
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_START,
  GET_PROJECT_SUCCESS
} from './ProjectActions'

import { SIGN_OUT_SUCCESS } from '../auth/sign-out/SignOutActions'

const project = (state, action) => {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const projects = (state = {}, action) => {
  console.log('ProjectReducers().projects()');
  console.log('state:', state);
  console.log('action:', action);

  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      console.log('ProjectReducers().projects() - case ADD_PROJECT');
      return {
        data: [
          ...state.data,
          project(undefined, action)
        ]
      }
    case ADD_PROJECT_ERROR:
      console.log('ProjectReducers() - case ADD_PROJECT_ERROR')
      return Object.assign({}, state, { error: action.payload })
    case GET_PROJECTS_SUCCESS:
      return {
        data: action.payload
      }
    case SIGN_OUT_SUCCESS:
      return {}
    default:
      return state
  }
}

export default projects
