import { combineReducers } from 'redux';
import { reduceConnections as connections } from './connecting/Repository';
import errors from './errors/Repository';
import queries from './queries/Repository';

export default combineReducers({
  connections,
  errors,
  queries,
});
