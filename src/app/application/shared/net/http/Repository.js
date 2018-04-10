import { combineReducers } from 'redux';
import requests from './requests/Repository';
import { reduceResources as resources } from './resources/Repository';

export default combineReducers({
  requests,
  resources,
});
