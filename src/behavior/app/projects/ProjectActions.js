export const CLEAR_DATABASE = 'app/projects/clear/database';
export const UPDATE_DATABASE = 'app/projects/update/database';

export const CREATE_ENTITY_REQUESTED = 'app/projects/create/entity/requested';
export const CREATE_ENTITY_STARTED = 'app/projects/create/entity/started';
export const CREATE_ENTITY_SUCCEEDED = 'app/projects/create/entity/succeeded';
export const CREATE_ENTITY_FAILED = 'app/projects/create/entity/failed';

export const READ_ENTITY_REQUESTED = 'app/projects/read/entity/requested';
export const READ_ENTITY_STARTED = 'app/projects/read/entity/started';
export const READ_ENTITY_SUCCEEDED = 'app/projects/read/entity/succeeded';
export const READ_ENTITY_FAILED = 'app/projects/read/entity/failed';

export const READ_ENTITIES_REQUESTED = 'app/projects/read/entities/requested';
export const READ_ENTITIES_STARTED = 'app/projects/read/entities/started';
export const READ_ENTITIES_SUCCEEDED = 'app/projects/read/entities/succeeded';
export const READ_ENTITIES_FAILED = 'app/projects/read/entities/failed';

export const UPDATE_ENTITY_REQUESTED = 'app/projects/update/entity/requested';
export const UPDATE_ENTITY_STARTED = 'app/projects/update/entity/started';
export const UPDATE_ENTITY_SUCCEEDED = 'app/projects/update/entity/succeeded';
export const UPDATE_ENTITY_FAILED = 'app/projects/update/entity/failed';

export const DELETE_ENTITY_REQUESTED = 'app/projects/delete/entity/requested';
export const DELETE_ENTITY_STARTED = 'app/projects/delete/entity/started';
export const DELETE_ENTITY_SUCCEEDED = 'app/projects/delete/entity/succeeded';
export const DELETE_ENTITY_FAILED = 'app/projects/delete/entity/failed';

export const clearDatabase = () => ({ type: CLEAR_DATABASE });
export const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

export const createEntity = (data, successCb) => {
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

export const createEntityStarted = () => ({ type: CREATE_ENTITY_STARTED });
export const createEntitySucceeded = payload => ({ type: CREATE_ENTITY_SUCCEEDED, payload });
export const createEntityFailed = payload => ({ type: CREATE_ENTITY_FAILED, payload });

export const readEntity = (id, params, killCache) => {
  if (!id) throw new Error('Argument <id> must not be null.');
  if (!params) throw new Error('Argument <params> must not be null.');

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

export const readEntityStarted = () => ({ type: READ_ENTITY_STARTED });
export const readEntitySucceeded = payload => ({ type: READ_ENTITY_SUCCEEDED, payload });
export const readEntityFailed = payload => ({ type: READ_ENTITY_FAILED, payload });

export const readEntities = (params, killCache) => ({
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

export const readEntitiesStarted = () => ({ type: READ_ENTITIES_STARTED });
export const readEntitiesSucceeded = payload => ({ type: READ_ENTITIES_SUCCEEDED, payload });
export const readEntitiesFailed = payload => ({ type: READ_ENTITIES_FAILED, payload });

export const updateEntity = (id, data, successCb) => {
  if (!id) throw new Error('Argument <data> must not be null.');
  if (!data) throw new Error('Argument <data> must not be null.');

  return {
    type: UPDATE_ENTITY_REQUESTED,
    meta: {
      http: {
        entity: {
          type: 'projects',
        },
        request: {
          data: { ...data, id },
          method: 'PATCH',
          url: `projects/${id}`,
        },
        successCb,
      },
    },
  };
};

export const updateEntityStarted = () => ({ type: UPDATE_ENTITY_STARTED });
export const updateEntitySucceeded = payload => ({ type: UPDATE_ENTITY_SUCCEEDED, payload });
export const updateEntityFailed = payload => ({ type: UPDATE_ENTITY_FAILED, payload });

export const deleteEntity = (id, successCb) => {
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

export const deleteEntityStarted = () => ({ type: DELETE_ENTITY_STARTED });
export const deleteEntitySucceeded = payload => ({ type: DELETE_ENTITY_SUCCEEDED, payload });
export const deleteEntityFailed = payload => ({ type: DELETE_ENTITY_FAILED, payload });
