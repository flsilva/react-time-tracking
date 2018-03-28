/*
 * @flow
 */

import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import type { AppState } from '../types';
import type { ApiErrors } from '../api/types';
import {
  CREATE_ENTITY_STARTED,
  CREATE_ENTITY_SUCCEEDED,
  CREATE_ENTITY_FAILED,
  READ_COLLECTION_STARTED,
  READ_COLLECTION_SUCCEEDED,
  READ_COLLECTION_FAILED,
  READ_ENTITY_STARTED,
  READ_ENTITY_SUCCEEDED,
  READ_ENTITY_FAILED,
  UPDATE_ENTITY_STARTED,
  UPDATE_ENTITY_SUCCEEDED,
  UPDATE_ENTITY_FAILED,
  DELETE_ENTITY_STARTED,
  DELETE_ENTITY_SUCCEEDED,
  DELETE_ENTITY_FAILED,
  CLEAR_DATABASE,
  UPDATE_DATABASE,
} from './types';

import type {
  Action,
  Database,
  DatabaseReducer,
  ErrorReducer,
  GetErrorSelector,
  GetIsConnectingSelector,
  IsConnectingReducer,
} from './types';

export const database: DatabaseReducer = (
  state: Database = {},
  action: Action,
): Database => {
  switch (action.type) {
    case UPDATE_DATABASE:
      return merge({ ...state }, action.payload);

    case CLEAR_DATABASE:
      return {};

    default:
      return state;
  }
};

const error: ErrorReducer = (state: ApiErrors = null, action: Action): ApiErrors => {
  switch (action.type) {
    case CREATE_ENTITY_FAILED:
    case DELETE_ENTITY_FAILED:
    case READ_COLLECTION_FAILED:
    case READ_ENTITY_FAILED:
    case UPDATE_ENTITY_FAILED:
      return action.payload || null;

    case CREATE_ENTITY_STARTED:
    case CREATE_ENTITY_SUCCEEDED:
    case DELETE_ENTITY_STARTED:
    case DELETE_ENTITY_SUCCEEDED:
    case READ_COLLECTION_STARTED:
    case READ_COLLECTION_SUCCEEDED:
    case READ_ENTITY_STARTED:
    case READ_ENTITY_SUCCEEDED:
    case UPDATE_ENTITY_STARTED:
    case UPDATE_ENTITY_SUCCEEDED:
      return null;

    default:
      return state;
  }
};

const isConnecting: IsConnectingReducer = (
  state: boolean = false,
  action: Action,
): boolean => {
  switch (action.type) {
    case CREATE_ENTITY_SUCCEEDED:
    case CREATE_ENTITY_FAILED:
    case DELETE_ENTITY_SUCCEEDED:
    case DELETE_ENTITY_FAILED:
    case READ_COLLECTION_SUCCEEDED:
    case READ_COLLECTION_FAILED:
    case READ_ENTITY_SUCCEEDED:
    case READ_ENTITY_FAILED:
    case UPDATE_ENTITY_SUCCEEDED:
    case UPDATE_ENTITY_FAILED:
      return false;

    case CREATE_ENTITY_STARTED:
    case DELETE_ENTITY_STARTED:
    case READ_COLLECTION_STARTED:
    case READ_ENTITY_STARTED:
    case UPDATE_ENTITY_STARTED:
      return true;

    default:
      return state;
  }
};

export const getError: GetErrorSelector = (state: AppState): ApiErrors | null => (
  state.projects.error
);

export const getIsConnecting: GetIsConnectingSelector = (state: AppState): boolean => (
  state.projects.isConnecting
);

export default combineReducers({
  error,
  isConnecting,
});
