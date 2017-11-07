import isString from 'lodash/isString';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import build from 'redux-object';
import isDate from 'date-fns/is_date';
import {
  READ_ENTITIES_STARTED,
  READ_ENTITIES_SUCCEEDED,
  READ_ENTITIES_FAILED,
  CLEAR_DATABASE,
  UPDATE_DATABASE,
} from './StopwatchActions';

const QUERY_ALL = './stopwatchese/query/entity/all';

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

const error = (state = null, action) => {
  switch (action.type) {
    case READ_ENTITIES_FAILED:
      return action.payload || null;

    case READ_ENTITIES_STARTED:
    case READ_ENTITIES_SUCCEEDED:
      return null;

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

export const getEntityById = (state, id) => {
  if (!id) throw new Error('Argument <id> must not be null.');

  const entity = build(state.database, 'stopwatches', id, {
    eager: true,
    ignoreLinks: true,
  });

  if (!entity) return undefined;

  const { activityDate, startedAt } = entity;
  if (activityDate) entity.activityDate = new Date(activityDate);
  if (startedAt && isString(startedAt)) entity.startedAt = new Date(startedAt);
  entity.isRunning = isDate(entity.startedAt);

  return entity;
};

export const getEntities = (state, _query = QUERY_ALL) => {
  if (!state.stopwatches) return undefined;

  const query = isString(_query) ? _query : JSON.stringify(_query);
  const fetchedQuery = state.stopwatches.fetchedQueries[query];

  if (!fetchedQuery) return undefined;

  return {
    entities: fetchedQuery.ids.map(id => getEntityById(state, id)),
    pagination: fetchedQuery.links,
  };
};

const isConnecting = (state = false, action) => {
  switch (action.type) {
    case READ_ENTITIES_SUCCEEDED:
    case READ_ENTITIES_FAILED:
      return false;

    case READ_ENTITIES_STARTED:
      return true;

    default:
      return state;
  }
};

export default combineReducers({
  error,
  fetchedQueries,
  isConnecting,
});
