import { ADD_PROJECT } from './Projects.actions'

const project = (state, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        id: action.id,
        title: action.title,
        active: false
      }
    default:
      return state
  }
}

const projects = (state = [], action) => {
  console.log('Projects.Reducers().projects()');
  console.log('state:', state);
  console.log('action:', action);

  switch (action.type) {
    case ADD_PROJECT:
      console.log('Projects.Reducers().projects() - case ADD_PROJECT');
      return [
        ...state,
        project(undefined, action)
      ]
    default:
      return state
  }
}

export default projects
