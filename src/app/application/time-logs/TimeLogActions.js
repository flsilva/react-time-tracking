export const CLEAR_DATABASE = 'app/time-logs/clear/database';
export const UPDATE_DATABASE = 'app/time-logs/update/database';

export const CREATE_ENTITY_REQUESTED = 'app/time-logs/create/entity/requested';
export const CREATE_ENTITY_STARTED = 'app/time-logs/create/entity/started';
export const CREATE_ENTITY_SUCCEEDED = 'app/time-logs/create/entity/succeeded';
export const CREATE_ENTITY_FAILED = 'app/time-logs/create/entity/failed';

export const READ_ENTITY_REQUESTED = 'app/time-logs/read/entity/requested';
export const READ_ENTITY_STARTED = 'app/time-logs/read/entity/started';
export const READ_ENTITY_SUCCEEDED = 'app/time-logs/read/entity/succeeded';
export const READ_ENTITY_FAILED = 'app/time-logs/read/entity/failed';

export const READ_ENTITIES_REQUESTED = 'app/time-logs/read/entities/requested';
export const READ_ENTITIES_STARTED = 'app/time-logs/read/entities/started';
export const READ_ENTITIES_SUCCEEDED = 'app/time-logs/read/entities/succeeded';
export const READ_ENTITIES_FAILED = 'app/time-logs/read/entities/failed';

export const UPDATE_ENTITY_REQUESTED = 'app/time-logs/update/entity/requested';
export const UPDATE_ENTITY_STARTED = 'app/time-logs/update/entity/started';
export const UPDATE_ENTITY_SUCCEEDED = 'app/time-logs/update/entity/succeeded';
export const UPDATE_ENTITY_FAILED = 'app/time-logs/update/entity/failed';

export const DELETE_ENTITY_REQUESTED = 'app/time-logs/delete/entity/requested';
export const DELETE_ENTITY_STARTED = 'app/time-logs/delete/entity/started';
export const DELETE_ENTITY_SUCCEEDED = 'app/time-logs/delete/entity/succeeded';
export const DELETE_ENTITY_FAILED = 'app/time-logs/delete/entity/failed';

export const clearDatabase = () => ({ type: CLEAR_DATABASE });
export const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

export const createEntity = (data, successCb) => {
  if (!data) throw new Error('Argument <data> must not be null.');
  if (!data.projectId) throw new Error('Argument <data.projectId> must not be null.');

  // like lodash _.omit(), but it also grabs projectId value
  const { projectId, ...newData } = data;

  return {
    type: CREATE_ENTITY_REQUESTED,
    meta: {
      http: {
        entity: {
          type: 'time_logs',
          relationships: [
            { attrName: 'author', type: 'users', id: 'AUTH_USER_ID' },
            { attrName: 'project', type: 'projects', id: projectId },
          ],
        },
        request: {
          data: newData,
          method: 'POST',
          url: 'time-logs/',
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
          url: `time-logs/${id}`,
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
        url: 'time-logs/',
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

  // like lodash _.omit(), but it also grabs projectId value
  const { projectId, ...newData } = data;

  return {
    type: UPDATE_ENTITY_REQUESTED,
    meta: {
      http: {
        entity: {
          type: 'time_logs',
          relationships: [
            { attrName: 'project', type: 'projects', id: projectId },
          ],
        },
        request: {
          data: { ...newData, id },
          method: 'PATCH',
          url: `time-logs/${id}`,
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
          url: `time-logs/${id}`,
        },
        successCb,
      },
    },
  };
};

export const deleteEntityStarted = () => ({ type: DELETE_ENTITY_STARTED });
export const deleteEntitySucceeded = payload => ({ type: DELETE_ENTITY_SUCCEEDED, payload });
export const deleteEntityFailed = payload => ({ type: DELETE_ENTITY_FAILED, payload });
