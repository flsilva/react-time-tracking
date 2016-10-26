import { ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR, GET_PROJECTS_SUCCESS } from './Project.Actions'
import { EMAIL_SIGN_OUT_SUCCESS, EMAIL_SIGN_OUT_ERROR } from '../auth/Auth.Actions'

const project = (state, action) => {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const projects = (state = {}, action) => {
  console.log('Project.Reducers().projects()');
  console.log('state:', state);
  console.log('action:', action);

  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      console.log('Project.Reducers().projects() - case ADD_PROJECT');
      return {
        data: [
          ...state.data,
          project(undefined, action)
        ]
      }
    case ADD_PROJECT_ERROR:
      console.log('Project.Reducers() - case ADD_PROJECT_ERROR')
      return Object.assign({}, state, { error: action.payload })
    case GET_PROJECTS_SUCCESS:
      return {
        data: action.payload
      }
    case EMAIL_SIGN_OUT_SUCCESS:
    case EMAIL_SIGN_OUT_ERROR:
      return {}
    default:
      return state
  }
}

export default projects
