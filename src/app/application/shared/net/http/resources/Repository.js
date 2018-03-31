/*
 * @flow
 */

import merge from 'lodash/merge';
import normalize from 'json-api-normalizer';
import type {
  ResourceDatabase,
  ResourceDatabaseReducer,
  UpdateResourceDatabaseAction,
} from './Types';
import { UPDATE_RESOURCE_DATABASE } from './Types';

export const reduceResources: ResourceDatabaseReducer = (
  state: ResourceDatabase = {},
  action: UpdateResourceDatabaseAction,
): ResourceDatabase => {
  console.log('reduceResources() - action: ', action);
  switch (action.type) {
    case UPDATE_RESOURCE_DATABASE:
      console.log('reduceResources() - UPDATE_RESOURCE_DATABASE');
      console.log('action.payload.response', action.payload.response);
      console.log('normalize(action.payload.response)', normalize(action.payload.response));
      return merge({ ...state }, normalize(action.payload.response));

    /*
    case CLEAR_DATABASE:
      return {};
    */

    default:
      return state;
  }
};

export default reduceResources;
