/*
 * @flow
 */

import omit from 'lodash/omit';

import type {
  ApiErrors,
  HttpQuery,
  HttpResponseWithQuery,
} from '../api/types';

import type {
  Collection,
  Database,
  Entity,
  CreateEntityPayload,
  UpdateEntityPayload,
  ClearDatabaseAction,
  ClearDatabaseActionCreator,
  UpdateDatabaseAction,
  UpdateDatabaseActionCreator,
  CreateEntityRequestedAction,
  CreateEntityRequestedActionCreator,
  CreateEntityStartedAction,
  CreateEntityStartedActionCreator,
  CreateEntitySucceededAction,
  CreateEntitySucceededActionCreator,
  CreateEntityFailedAction,
  CreateEntityFailedActionCreator,
  ReadEntityRequestedAction,
  ReadEntityRequestedActionCreator,
  ReadEntityStartedAction,
  ReadEntityStartedActionCreator,
  ReadEntitySucceededAction,
  ReadEntitySucceededActionCreator,
  ReadEntityFailedAction,
  ReadEntityFailedActionCreator,
  ReadCollectionRequestedAction,
  ReadCollectionRequestedActionCreator,
  ReadCollectionStartedAction,
  ReadCollectionStartedActionCreator,
  ReadCollectionSucceededAction,
  ReadCollectionSucceededActionCreator,
  ReadCollectionFailedAction,
  ReadCollectionFailedActionCreator,
  UpdateEntityRequestedAction,
  UpdateEntityRequestedActionCreator,
  UpdateEntityStartedAction,
  UpdateEntityStartedActionCreator,
  UpdateEntitySucceededAction,
  UpdateEntitySucceededActionCreator,
  UpdateEntityFailedAction,
  UpdateEntityFailedActionCreator,
  DeleteEntityRequestedAction,
  DeleteEntityRequestedActionCreator,
  DeleteEntityStartedAction,
  DeleteEntityStartedActionCreator,
  DeleteEntitySucceededAction,
  DeleteEntitySucceededActionCreator,
  DeleteEntityFailedAction,
  DeleteEntityFailedActionCreator,
} from './types';
import {
  CLEAR_DATABASE,
  UPDATE_DATABASE,
  CREATE_ENTITY_REQUESTED,
  CREATE_ENTITY_STARTED,
  CREATE_ENTITY_SUCCEEDED,
  CREATE_ENTITY_FAILED,
  READ_ENTITY_REQUESTED,
  READ_ENTITY_STARTED,
  READ_ENTITY_SUCCEEDED,
  READ_ENTITY_FAILED,
  READ_COLLECTION_REQUESTED,
  READ_COLLECTION_STARTED,
  READ_COLLECTION_SUCCEEDED,
  READ_COLLECTION_FAILED,
  UPDATE_ENTITY_REQUESTED,
  UPDATE_ENTITY_STARTED,
  UPDATE_ENTITY_SUCCEEDED,
  UPDATE_ENTITY_FAILED,
  DELETE_ENTITY_REQUESTED,
  DELETE_ENTITY_STARTED,
  DELETE_ENTITY_SUCCEEDED,
  DELETE_ENTITY_FAILED,
} from './types';

export const clearDatabase: ClearDatabaseActionCreator = (): ClearDatabaseAction => (
  { type: CLEAR_DATABASE }
);

export const updateDatabase: UpdateDatabaseActionCreator = (
  payload: Database,
): UpdateDatabaseAction => ({ type: UPDATE_DATABASE, payload });

export const createEntity: CreateEntityRequestedActionCreator = (
  payload: CreateEntityPayload,
  successCb?: () => mixed,
): CreateEntityRequestedAction => {
  if (!payload) throw new Error('Argument <payload> must not be null.');

  return {
    type: CREATE_ENTITY_REQUESTED,
    meta: {
      http: {
        resource: {
          method: 'POST',
          payload: {
            data: {
              attributes: payload,
              relationships: {
                author: {
                  data: { id: 'AUTH_USER_ID', type: 'users' },
                },
              },
              type: 'projects',
            },
          },
          url: 'projects/',
        },
        successCb,
      },
    },
  };
};

export const createEntityStarted: CreateEntityStartedActionCreator = (
): CreateEntityStartedAction => ({
  type: CREATE_ENTITY_STARTED,
});

export const createEntitySucceeded: CreateEntitySucceededActionCreator = (
  payload: Entity,
): CreateEntitySucceededAction => ({ type: CREATE_ENTITY_SUCCEEDED, payload });

export const createEntityFailed: CreateEntityFailedActionCreator = (
  payload: ApiErrors,
): CreateEntityFailedAction => ({ type: CREATE_ENTITY_FAILED, payload });

export const readEntity: ReadEntityRequestedActionCreator = (
  query: HttpQuery,
  killCache?: boolean,
): ReadEntityRequestedAction => {
  if (!query) throw new Error('Argument <query> must not be null.');
  if (!query.unit) throw new Error('Argument <query.unit> must not be null.');
  if (!query.unit.id) throw new Error('Argument <query.unit.id> must not be null.');

  return {
    type: READ_ENTITY_REQUESTED,
    meta: {
      http: {
        killCache,
        resource: {
          method: 'GET',
          query,
          url: `projects/${query.unit.id}`,
        },
      },
    },
  };
};

export const readEntityStarted: ReadEntityStartedActionCreator = (
): ReadEntityStartedAction => ({
  type: READ_ENTITY_STARTED,
});

export const readEntitySucceeded: ReadEntitySucceededActionCreator = (
  payload: HttpResponseWithQuery<Entity>,
): ReadEntitySucceededAction => ({ type: READ_ENTITY_SUCCEEDED, payload });

export const readEntityFailed: ReadEntityFailedActionCreator = (
  payload: ApiErrors,
): ReadEntityFailedAction => ({ type: READ_ENTITY_FAILED, payload });

export const readCollection: ReadCollectionRequestedActionCreator = (
  query?: HttpQuery,
  killCache?: boolean,
): ReadCollectionRequestedAction => ({
  type: READ_COLLECTION_REQUESTED,
  meta: {
    http: {
      killCache,
      resource: {
        method: 'GET',
        query,
        url: 'projects/',
      },
    },
  },
});

export const readCollectionStarted: ReadCollectionStartedActionCreator = (
): ReadCollectionStartedAction => ({
  type: READ_COLLECTION_STARTED,
});

export const readCollectionSucceeded: ReadCollectionSucceededActionCreator = (
  payload: HttpResponseWithQuery<Collection>,
): ReadCollectionSucceededAction => ({
  type: READ_COLLECTION_SUCCEEDED,
  payload,
});

export const readCollectionFailed: ReadCollectionFailedActionCreator = (
  payload: ApiErrors,
): ReadCollectionFailedAction => ({
  type: READ_COLLECTION_FAILED,
  payload,
});

export const updateEntity: UpdateEntityRequestedActionCreator = (
  payload: UpdateEntityPayload,
  successCb?: () => mixed,
): UpdateEntityRequestedAction => {
  if (!payload) throw new Error('Argument <payload> must not be null.');
  if (!payload.id) throw new Error('Attribute <payload.id> must not be null.');

  return {
    type: UPDATE_ENTITY_REQUESTED,
    meta: {
      http: {
        resource: {
          method: 'PATCH',
          payload: {
            data: {
              attributes: omit(payload, 'id'),
              id: payload.id,
              type: 'projects',
            },
          },
          url: `projects/${payload.id}`,
        },
        successCb,
      },
    },
  };
};

export const updateEntityStarted: UpdateEntityStartedActionCreator = (
): UpdateEntityStartedAction => ({
  type: UPDATE_ENTITY_STARTED,
});

export const updateEntitySucceeded: UpdateEntitySucceededActionCreator = (
  payload: Entity,
): UpdateEntitySucceededAction => ({
  type: UPDATE_ENTITY_SUCCEEDED,
  payload,
});

export const updateEntityFailed: UpdateEntityFailedActionCreator = (
  payload: ApiErrors,
): UpdateEntityFailedAction => ({
  type: UPDATE_ENTITY_FAILED,
  payload,
});

export const deleteEntity: DeleteEntityRequestedActionCreator = (
  id: string,
  successCb?: () => mixed,
): DeleteEntityRequestedAction => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    type: DELETE_ENTITY_REQUESTED,
    meta: {
      http: {
        resource: {
          method: 'DELETE',
          url: `projects/${id}`,
        },
        successCb,
      },
    },
  };
};

export const deleteEntityStarted: DeleteEntityStartedActionCreator = (
): DeleteEntityStartedAction => ({
  type: DELETE_ENTITY_STARTED,
});

export const deleteEntitySucceeded: DeleteEntitySucceededActionCreator = (
): DeleteEntitySucceededAction => ({
  type: DELETE_ENTITY_SUCCEEDED,
});

export const deleteEntityFailed: DeleteEntityFailedActionCreator = (
  payload: ApiErrors,
): DeleteEntityFailedAction => ({
  type: DELETE_ENTITY_FAILED,
  payload,
});
