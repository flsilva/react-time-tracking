/*
 * @flow
 */

import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import trim from 'lodash/trim';
import normalize from 'json-api-normalizer';
import type { RootState } from '../../../Types';
import type {
  ResourceChecker,
  ResourceDatabaseGetter,
  ResourceMap,
  ResourceMapChecker,
  ResourceDatabase,
  ResourceDatabaseAction,
  ResourceDatabaseReducer,
  ResourceGetter,
  ResourceMapGetter,
  ResourceObject,
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
      return omit(state, [action.payload]);

    default:
      return state;
  }
};

export const getResourceDatabase: ResourceDatabaseGetter = (
  state: RootState,
): ResourceDatabase => {
  if (!state) {
    throw new Error('Argument <state> must be a valid object.');
  }

  return state.net.http.responses.resources;
};

export const getResourceMap: ResourceMapGetter = (
  state: RootState,
  type: string,
): ResourceMap | void => {
  if (!state) {
    throw new Error('Argument <state> must be a valid object.');
  }

  if (!isString(type) || isEmpty(trim(type))) {
    throw new Error('Argument <type> must be a valid string.');
  }

  return getResourceDatabase(state)[type];
};

export const getResource: ResourceGetter = (
  state: RootState,
  type: string,
  id: string,
): ResourceObject | void => {
  if (!state) {
    throw new Error('Argument <state> must be a valid object.');
  }

  if (!isString(type) || isEmpty(trim(type))) {
    throw new Error('Argument <type> must be a valid string.');
  }

  if (!isString(id) || isEmpty(trim(id))) {
    throw new Error('Argument <id> must be a valid string.');
  }

  const map: ResourceMap | void = getResourceMap(state, type);
  if (!map) return undefined;
  return map[id];
};

export const hasResource: ResourceChecker = (
  state: RootState,
  type: string,
  id: string,
): boolean => getResource(state, type, id) !== undefined;

export const hasResourceMap: ResourceMapChecker = (
  state: RootState,
  type: string,
): boolean => getResourceMap(state, type) !== undefined;
