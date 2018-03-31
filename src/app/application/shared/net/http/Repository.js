import { combineReducers } from 'redux';
import requests from './requests/Repository';
import resources from './resources/Repository';

export default combineReducers({
  requests,
  resources,
});
