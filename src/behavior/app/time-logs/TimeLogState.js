import merge from 'lodash/merge';
import flatten from 'lodash/flatten';
import isString from 'lodash/isString';
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
} from './TimeLogActions';

const QUERY_ALL = 'app/time-logs/query/entity/all';

export const entities = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge({ ...state }, action.payload);

    case CLEAR_DATABASE:
      return {};

    default:
      return state;
  }
};

const fetchedQueries = (state = {}, { payload, type }) => {
  switch (type) {
    case READ_ENTITIES_SUCCEEDED: {
      let query = payload.query || QUERY_ALL;
      query = isString(query) ? query : JSON.stringify(query);

      return {
        ...state,
        [query]: {
          ids: payload.data.data.map(entity => entity.id),
          links: payload.data.links,
        },
      };
    }

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
  return build(state.database, 'time_logs', id, { eager: true, ignoreLinks: true });
};

export const getEntities = (state, queries = []) => {
  if (!state.timeLogs) return null;
  if (!queries.length) queries.push(QUERY_ALL);

  return flatten(
    // transform query objects into strings
    // so we can use them to index fetchedQueries
    queries.map(query => (isString(query) ? query : JSON.stringify(query)))
    // filter out requested queries not stored
    .filter(query => state.timeLogs.fetchedQueries[query])
    // map an array of queries (String objects)
    // to an array of arrays of entity IDs
    .map(query => state.timeLogs.fetchedQueries[query].ids
      // map an array of entity IDs to entity Objects
      .map(id => readEntityById(state, id)),
    ));
};

export const getEntitiesPaginationByQuery = (state, _query) => {
  if (!state.timeLogs || !state.timeLogs.fetchedQueries) return null;

  const query = isString(_query) ? _query : JSON.stringify(_query);
  const fetchedQuery = state.timeLogs.fetchedQueries[query];
  if (!fetchedQuery) return null;

  return fetchedQuery.links;
};

export default combineReducers({
  error,
  fetchedQueries,
  isConnecting,
});
