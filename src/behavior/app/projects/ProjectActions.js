/*
 * @flow
 */

import type {
  ApiErrors,
  GetEntitiesRequestParams,
  GetEntityRequestParams,
  HttpResponseWithQuery,
} from '../api/types';

import type {
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
  ReadEntitiesRequestedAction,
  ReadEntitiesRequestedActionCreator,
  ReadEntitiesStartedAction,
  ReadEntitiesStartedActionCreator,
  ReadEntitiesSucceededAction,
  ReadEntitiesSucceededActionCreator,
  ReadEntitiesFailedAction,
  ReadEntitiesFailedActionCreator,
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
  READ_ENTITIES_REQUESTED,
  READ_ENTITIES_STARTED,
  READ_ENTITIES_SUCCEEDED,
  READ_ENTITIES_FAILED,
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
  data: CreateEntityPayload,
  successCb?: () => mixed,
): CreateEntityRequestedAction => {
  if (!data) throw new Error('Argument <data> must not be null.');

  return {
    type: CREATE_ENTITY_REQUESTED,
    meta: {
      http: {
        entity: {
          type: 'projects',
          relationships: [
            { attrName: 'author', type: 'users', id: 'AUTH_USER_ID' },
          ],
        },
        request: {
          data,
          method: 'POST',
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
  id: string,
  params: GetEntityRequestParams,
  killCache?: boolean,
): ReadEntityRequestedAction => {
  if (!id) throw new Error('Argument <id> must not be null.');

  return {
    type: READ_ENTITY_REQUESTED,
    meta: {
      http: {
        entity: {
          id,
        },
        killCache,
        request: {
          method: 'GET',
          params,
          url: `projects/${id}`,
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
  payload: Entity,
): ReadEntitySucceededAction => ({ type: READ_ENTITY_SUCCEEDED, payload });

export const readEntityFailed: ReadEntityFailedActionCreator = (
  payload: ApiErrors,
): ReadEntityFailedAction => ({ type: READ_ENTITY_FAILED, payload });

export const readEntities: ReadEntitiesRequestedActionCreator = (
  params?: GetEntitiesRequestParams,
  killCache?: boolean,
): ReadEntitiesRequestedAction => ({
  type: READ_ENTITIES_REQUESTED,
  meta: {
    http: {
      killCache,
      request: {
        method: 'GET',
        params,
        url: 'projects/',
      },
    },
  },
});

export const readEntitiesStarted: ReadEntitiesStartedActionCreator = (
): ReadEntitiesStartedAction => ({
  type: READ_ENTITIES_STARTED,
});

export const readEntitiesSucceeded: ReadEntitiesSucceededActionCreator = (
  payload: HttpResponseWithQuery<Array<Entity>>,
): ReadEntitiesSucceededAction => ({
  type: READ_ENTITIES_SUCCEEDED,
  payload,
});

export const readEntitiesFailed: ReadEntitiesFailedActionCreator = (
  payload: ApiErrors,
): ReadEntitiesFailedAction => ({
  type: READ_ENTITIES_FAILED,
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
        entity: {
          type: 'projects',
        },
        request: {
          data: payload,
          method: 'PATCH',
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
        request: {
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
