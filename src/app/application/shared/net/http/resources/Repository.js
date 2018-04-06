/*
 * @flow
 */

import merge from 'lodash/merge';
import normalize from 'json-api-normalizer';
import type {
  ResourceDatabase,
  ResourceDatabaseAction,
  ResourceDatabaseReducer,
} from './Types';
import { CLEAR_RESOURCE_DATABASE, UPDATE_RESOURCE_DATABASE } from './Types';

export const reduceResources: ResourceDatabaseReducer = (
  state: ResourceDatabase = {},
  action: ResourceDatabaseAction,
): ResourceDatabase => {
  switch (action.type) {
    case UPDATE_RESOURCE_DATABASE:
      return merge({ ...state }, normalize(action.payload.response));

    case CLEAR_RESOURCE_DATABASE:
      return Object.keys(state)
        .filter((resourceType: string): boolean => resourceType !== action.payload)
        .reduce((acc: ResourceDatabase, resourceType: string): ResourceDatabase => (
          { ...acc, [resourceType]: state[resourceType] }
        ), {});

    default:
      return state;
  }
};

export default reduceResources;
