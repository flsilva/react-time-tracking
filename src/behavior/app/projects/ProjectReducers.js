import normalize from 'json-api-normalizer';
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
} from './ProjectActions';
import { SIGN_OUT_SUCCESS } from '../auth/sign-out/SignOutActions';

export const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
    case GET_PROJECT_SUCCESS:
    case GET_PROJECTS_SUCCESS:
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        ...normalize(action.payload.data).projects,
      };

    case SIGN_OUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

const queries = (state = {}, action) => {
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

const isFetched = (state = false, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return true;

    default:
      return state;
  }
};

export const denormalizeItem = (project) => {
  if (!project) return null;
  return { id: project.id, ...project.attributes };
};

const denormalizeCollection = projects => (
  projects ?
    Object.keys(projects).map(key => projects[key])
      .map(value => denormalizeItem(value))
    : null
);

export const getProjectById = (state, id) => (
  state.database && state.database.projects ?
    denormalizeItem(state.database.projects[id]) : null
);

// export const getCollection = state => denormalizeCollection(state.projects.byId);
export const getCollectionByQueries = (state, queries = []) => {
  console.log('ProjectReducers().getCollectionByQueries() - queries: ', queries);

  // if (!state.projects || !state.projects.idsByQuery[query]) return null;
  if (!state.projects || !queries.length) return null;

  // return state.projects.idsByQuery[query].map(id => getProjectById(state, id));
  const collection = flatten(queries.filter(query => state.projects.queries[query])
    .map(query => {
      console.log('ProjectReducers().getCollectionByQueries() - query: ', query);
      return state.projects.queries[query].ids.map(id => getProjectById(state, id));
  }));

  console.log('ProjectReducers().getCollectionByQueries() - collection: ', collection);

  return collection;
};

export const getCollectionLinksByQuery = (state, query) => (
  state.projects && state.projects.queries && state.projects.queries[query] ?
    state.projects.queries[query].links : null
);

export default combineReducers({
  // byId,
  error,
  queries,
  isFetching,
  isFetched,
});
