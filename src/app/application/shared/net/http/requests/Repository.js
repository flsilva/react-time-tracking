import { combineReducers } from 'redux';
import connecting from './connecting/Repository';
import errors from './errors/Repository';
import queries from './queries/Repository';

export default combineReducers({
  connecting,
  errors,
  queries,
});
