const project = (state, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
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
  console.log('reducer: projects()');
  console.log('state:', state);
  console.log('action:', action);

  switch (action.type) {
    case 'ADD_PROJECT':
      return [
        ...state,
        project(undefined, action)
      ]
    default:
      return state
  }
}

export default projects
