import merge from 'lodash/merge';
import flatten from 'lodash/flatten';
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
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  UPDATE_DATABASE,
} from './ProjectActions';
import { SIGN_OUT_SUCCESS } from '../auth/sign-out/SignOutActions';

export const byId = (state = {}, action) => {
  switch (action.type) {
    /*
    case ADD_PROJECT_SUCCESS:
    case GET_PROJECT_SUCCESS:
    case GET_PROJECTS_SUCCESS:
    case UPDATE_PROJECT_SUCCESS:
    */
    case UPDATE_DATABASE:
      return merge(state, action.payload);

    case SIGN_OUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

const fetchedQueries = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        [action.payload.query]: {
          ids: action.payload.data.data.map(entity => entity.id),
          links: action.payload.data.links,
        },
      };

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case ADD_PROJECT_ERROR:
    case GET_PROJECTS_ERROR:
    case GET_PROJECT_ERROR:
    case UPDATE_PROJECT_ERROR:
      return action.payload || null;

    case ADD_PROJECT_START:
    case ADD_PROJECT_SUCCESS:
    case GET_PROJECTS_START:
    case GET_PROJECTS_SUCCESS:
    case GET_PROJECT_START:
    case GET_PROJECT_SUCCESS:
    case UPDATE_PROJECT_START:
    case UPDATE_PROJECT_SUCCESS:
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
    case UPDATE_PROJECT_SUCCESS:
    case UPDATE_PROJECT_ERROR:
      return false;

    case ADD_PROJECT_START:
    case GET_PROJECTS_START:
    case GET_PROJECT_START:
    case UPDATE_PROJECT_START:
      return true;

    default:
      return state;
  }
};

export const denormalizeItem = (project) => {
  if (!project) return null;
  return { id: project.id, ...project.attributes };
};

export const getProjectById = (state, id) => (
  state.database && state.database.projects && state.database.projects[id] ?
    denormalizeItem(state.database.projects[id]) : null
);

export const getCollectionByQueries = (state, queries = []) => {
  if (!state.projects || !queries.length) return null;

  return flatten(
    // filter out requested queries not stored
    queries.filter(query => state.projects.fetchedQueries[query])
    // map an array of queries (String objects)
    // to an array of arrays of entity IDs
    .map(query => state.projects.fetchedQueries[query].ids
      // map an array of entity IDs to entity Objects
      .map(id => getProjectById(state, id)),
    ));
};

export const getCollectionLinksByQuery = (state, query) => (
  state.projects && state.projects.fetchedQueries && state.projects.fetchedQueries[query] ?
    state.projects.fetchedQueries[query].links : null
);

export default combineReducers({
  error,
  fetchedQueries,
  isFetching,
});
