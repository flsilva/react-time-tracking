import { getFetcher } from '../api/ApiConfig'

export const ADD_PROJECT_START = 'ADD_PROJECT_START'
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS'
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR'

export const GET_PROJECTS_START = 'GET_PROJECTS_START'
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS'
export const GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR'

const addProjectStart = () => ({ type: ADD_PROJECT_START })
const addProjectSuccess = (payload) => ({ type: ADD_PROJECT_SUCCESS, payload })
const addProjectError = (payload) => ({ type: ADD_PROJECT_ERROR, payload })

const getProjectsStart = () => ({ type: GET_PROJECTS_START })
const getProjectsSuccess = (payload) => ({ type: GET_PROJECTS_SUCCESS, payload })
const getProjectsError = (payload) => ({ type: GET_PROJECTS_ERROR, payload })

export const addProject = (data) => (
  (dispatch) => {
    console.log('Projects.actions().addProject() - data: ', data)

    dispatch(addProjectStart())

    const errorHandler = (error) => {
      console.log('Project.Actions::addProject().errorHandler() - error: ', error)
      dispatch(addProjectError(error))
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('Auth.Actions::addProject().successHandler() - json: ', json)
      dispatch(addProjectSuccess(json))
      return json
    }

    const opts = {
      body: JSON.stringify(data),
      method: 'POST'
    }

    const payload = {
      opts,
      path: 'projects'
    }

    return getFetcher().fetch(payload).then(successHandler).catch(errorHandler)
  }
)

export const getProjects = () => (
  (dispatch, getState) => {
    console.log('Projects.actions().getProjects()')

    dispatch(getProjectsStart())

    const errorHandler = (error) => {
      console.log('Project.Actions::getProjects().errorHandler() - error: ', error)
      dispatch(getProjectsError(error))
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('Auth.Actions::getProjects().successHandler() - json: ', json)
      dispatch(getProjectsSuccess(json))
    }

    const opts = {
      method: 'GET'
    }

    const payload = {
      opts,
      path: 'projects'
    }

    return getFetcher().fetch(payload).then(successHandler).catch(errorHandler)
  }
)
