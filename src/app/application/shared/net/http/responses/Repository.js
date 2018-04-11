import { combineReducers } from 'redux';
import { reduceErrors as errors } from './errors';
import { reduceResources as resources } from './resources';

// eslint-disable-next-line import/prefer-default-export
export const reduceResponses = combineReducers({
  errors,
  resources,
});
