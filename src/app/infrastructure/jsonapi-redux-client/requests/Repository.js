import { combineReducers } from 'redux';
import { reduceConnections as connections } from './connections';
import { reduceQueries as queries } from './queries';

// eslint-disable-next-line import/prefer-default-export
export const reduceRequests = combineReducers({
  connections,
  queries,
});
