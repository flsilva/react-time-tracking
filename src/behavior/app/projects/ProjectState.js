import merge from 'lodash/merge';
import flatten from 'lodash/flatten';
import { combineReducers } from 'redux';
import build from 'redux-object';
import {
  CREATE_ENTITY_STARTED,
  CREATE_ENTITY_SUCCEEDED,
  CREATE_ENTITY_FAILED,
  READ_ENTITIES_STARTED,
  READ_ENTITIES_SUCCEEDED,
  READ_ENTITIES_FAILED,
  READ_ENTITY_STARTED,
  READ_ENTITY_SUCCEEDED,
  READ_ENTITY_FAILED,
  UPDATE_ENTITY_STARTED,
  UPDATE_ENTITY_SUCCEEDED,
  UPDATE_ENTITY_FAILED,
  DELETE_ENTITY_STARTED,
  DELETE_ENTITY_SUCCEEDED,
  DELETE_ENTITY_FAILED,
  CLEAR_DATABASE,
  UPDATE_DATABASE,
} from './ProjectActions';
import { USER_SIGN_OUT_SUCCEEDED } from '../auth/AuthActions';

const QUERY_ALL = 'app/projects/query/entity/all';

export const entities = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge({ ...state }, action.payload);

    case CLEAR_DATABASE:
    case USER_SIGN_OUT_SUCCEEDED:
      return {};

    default:
      return state;
  }
};

const fetchedQueries = (state = {}, action) => {
  switch (action.type) {
    case READ_ENTITIES_SUCCEEDED:
      return {
        ...state,
        [JSON.stringify(action.payload.query)]: {
          ids: action.payload.data.data.map(entity => entity.id),
          links: action.payload.data.links,
        },
      };

    case CLEAR_DATABASE:
      return {};

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case CREATE_ENTITY_FAILED:
    case DELETE_ENTITY_FAILED:
    case READ_ENTITIES_FAILED:
    case READ_ENTITY_FAILED:
    case UPDATE_ENTITY_FAILED:
      return action.payload || null;

    case CREATE_ENTITY_STARTED:
    case CREATE_ENTITY_SUCCEEDED:
    case DELETE_ENTITY_STARTED:
    case DELETE_ENTITY_SUCCEEDED:
    case READ_ENTITIES_STARTED:
    case READ_ENTITIES_SUCCEEDED:
    case READ_ENTITY_STARTED:
    case READ_ENTITY_SUCCEEDED:
    case UPDATE_ENTITY_STARTED:
    case UPDATE_ENTITY_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

const isConnecting = (state = false, action) => {
  switch (action.type) {
    case CREATE_ENTITY_SUCCEEDED:
    case CREATE_ENTITY_FAILED:
    case DELETE_ENTITY_SUCCEEDED:
    case DELETE_ENTITY_FAILED:
    case READ_ENTITIES_SUCCEEDED:
    case READ_ENTITIES_FAILED:
    case READ_ENTITY_SUCCEEDED:
    case READ_ENTITY_FAILED:
    case UPDATE_ENTITY_SUCCEEDED:
    case UPDATE_ENTITY_FAILED:
      return false;

    case CREATE_ENTITY_STARTED:
    case DELETE_ENTITY_STARTED:
    case READ_ENTITIES_STARTED:
    case READ_ENTITY_STARTED:
    case UPDATE_ENTITY_STARTED:
      return true;

    default:
      return state;
  }
};

export const readEntityById = (state, id) => {
  if (!id) return null;
  return build(state.database, 'projects', id, { eager: true, ignoreLinks: true });
};

export const getEntities = (state, queries = []) => {
  if (!state.projects) return null;
  if (!queries.length) queries.push(QUERY_ALL);

  return flatten(
    // transform query objects into strings
    // so we can use them to index fetchedQueries
    queries.map(query => JSON.stringify(query))
    // filter out requested queries not stored
    .filter(query => state.projects.fetchedQueries[query])
    // map an array of queries (String objects)
    // to an array of arrays of entity IDs
    .map(query => state.projects.fetchedQueries[query].ids
      // map an array of entity IDs to entity Objects
      .map(id => readEntityById(state, id)),
    ));
};

export const getEntitiesPaginationByQuery = (state, _query) => {
  if (!state.projects || !state.projects.fetchedQueries) return null;

  const query = JSON.stringify(_query);
  const fetchedQuery = state.projects.fetchedQueries[query];
  if (!fetchedQuery) return null;

  return fetchedQuery.links;
};

export default combineReducers({
  error,
  fetchedQueries,
  isConnecting,
});
