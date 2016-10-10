export const ADD_PROJECT = 'ADD_PROJECT'

//export const addProject = title => ({ type: ADD_Project, title })

export const addProject = (title) => {
  console.log('Projects.actions().addProject() - title: ' + title)
  return { type: ADD_PROJECT, title }
}
