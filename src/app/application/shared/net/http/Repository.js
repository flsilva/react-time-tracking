import { combineReducers } from 'redux';
import { reduceRequests as requests } from './requests';
import { reduceResponses as responses } from './responses';

export default combineReducers({
  requests,
  responses,
});
