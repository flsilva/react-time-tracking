import { combineReducers } from 'redux';
import { reduceRequests as requests } from './requests';
import { reduceResponses as responses } from './responses';

// eslint-disable-next-line import/prefer-default-export
export const reducer = combineReducers({
  requests,
  responses,
});
