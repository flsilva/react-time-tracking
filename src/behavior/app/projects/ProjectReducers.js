import { combineReducers } from 'redux';
import {
  ADD_PROJECT_START,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_PROJECT_START,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_ERROR,
} from './ProjectActions';
import { SIGN_OUT_SUCCESS } from '../auth/sign-out/SignOutActions';

const data = (state = [], action) => {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      return [
        ...state,
        action.payload,
      ];

    case GET_PROJECTS_SUCCESS:
      return action.payload || null;

    case SIGN_OUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case ADD_PROJECT_ERROR:
    case GET_PROJECTS_ERROR:
    case GET_PROJECT_ERROR:
      return action.payload || null;

    case ADD_PROJECT_START:
    case ADD_PROJECT_SUCCESS:
    case GET_PROJECTS_START:
    case GET_PROJECTS_SUCCESS:
    case GET_PROJECT_START:
    case GET_PROJECT_SUCCESS:
      return null;

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
    case ADD_PROJECT_ERROR:
    case GET_PROJECTS_SUCCESS:
    case GET_PROJECTS_ERROR:
    case GET_PROJECT_SUCCESS:
    case GET_PROJECT_ERROR:
      return false;

    case ADD_PROJECT_START:
    case GET_PROJECTS_START:
    case GET_PROJECT_START:
      return true;

    default:
      return state;
  }
};

export default combineReducers({
  data,
  error,
  isFetching,
});
