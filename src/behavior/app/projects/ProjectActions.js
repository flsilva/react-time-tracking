import { put, select, takeLatest } from 'redux-saga/effects';
import { readEntityById, getEntities } from './ProjectState';

export const CLEAR_DATABASE = 'app/projects/clear/database';
export const UPDATE_DATABASE = 'app/projects/update/database';

const CREATE_ENTITY_REQUESTED = 'app/projects/create/entity/requested';
export const CREATE_ENTITY_STARTED = 'app/projects/create/entity/started';
export const CREATE_ENTITY_SUCCEEDED = 'app/projects/create/entity/succeeded';
export const CREATE_ENTITY_FAILED = 'app/projects/create/entity/failed';

const READ_ENTITY_REQUESTED = 'app/projects/read/entity/requested';
export const READ_ENTITY_STARTED = 'app/projects/read/entity/started';
export const READ_ENTITY_SUCCEEDED = 'app/projects/read/entity/succeeded';
export const READ_ENTITY_FAILED = 'app/projects/read/entity/failed';

const READ_ENTITIES_REQUESTED = 'app/projects/read/entities/requested';
export const READ_ENTITIES_STARTED = 'app/projects/read/entities/started';
export const READ_ENTITIES_SUCCEEDED = 'app/projects/read/entities/succeeded';
export const READ_ENTITIES_FAILED = 'app/projects/read/entities/failed';

const UPDATE_ENTITY_REQUESTED = 'app/projects/update/entity/requested';
export const UPDATE_ENTITY_STARTED = 'app/projects/update/entity/started';
export const UPDATE_ENTITY_SUCCEEDED = 'app/projects/update/entity/succeeded';
export const UPDATE_ENTITY_FAILED = 'app/projects/update/entity/failed';

const DELETE_ENTITY_REQUESTED = 'app/projects/delete/entity/requested';
export const DELETE_ENTITY_STARTED = 'app/projects/delete/entity/started';
export const DELETE_ENTITY_SUCCEEDED = 'app/projects/delete/entity/succeeded';
export const DELETE_ENTITY_FAILED = 'app/projects/delete/entity/failed';

const clearDatabase = () => ({ type: CLEAR_DATABASE });
const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

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

const createEntityStarted = () => ({ type: CREATE_ENTITY_STARTED });
const createEntitySucceeded = payload => ({ type: CREATE_ENTITY_SUCCEEDED, payload });
const createEntityFailed = payload => ({ type: CREATE_ENTITY_FAILED, payload });

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

const readEntityStarted = () => ({ type: READ_ENTITY_STARTED });
const readEntitySucceeded = payload => ({ type: READ_ENTITY_SUCCEEDED, payload });
const readEntityFailed = payload => ({ type: READ_ENTITY_FAILED, payload });

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

const readEntitiesStarted = () => ({ type: READ_ENTITIES_STARTED });
const readEntitiesSucceeded = payload => ({ type: READ_ENTITIES_SUCCEEDED, payload });
const readEntitiesFailed = payload => ({ type: READ_ENTITIES_FAILED, payload });

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

const updateEntityStarted = () => ({ type: UPDATE_ENTITY_STARTED });
const updateEntitySucceeded = payload => ({ type: UPDATE_ENTITY_SUCCEEDED, payload });
const updateEntityFailed = payload => ({ type: UPDATE_ENTITY_FAILED, payload });

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

const deleteEntityStarted = () => ({ type: DELETE_ENTITY_STARTED });
const deleteEntitySucceeded = payload => ({ type: DELETE_ENTITY_SUCCEEDED, payload });
const deleteEntityFailed = payload => ({ type: DELETE_ENTITY_FAILED, payload });

function* createEntitySaga({ meta }) {
  try {
    yield put(createEntityStarted());

    const { makeRequest, request, successCb } = meta.http;
    const response = yield makeRequest(request);

    yield put(clearDatabase());
    yield put(updateDatabase({ data: response.data }));
    yield put(createEntitySucceeded({ data: response.data }));
    if (successCb) successCb();
  } catch (error) {
    yield put(createEntityFailed(error));
  }
}

function* readEntitiesSaga({ meta }) {
  const { makeRequest, killCache, request } = meta.http;

  if (!killCache) {
    const cachedProjects = yield select(getEntities, [request.params]);
    if (cachedProjects && cachedProjects.length) return;
  }

  try {
    yield put(readEntitiesStarted());

    const response = yield makeRequest(request);

    yield put(updateDatabase({ data: response.data }));
    yield put(readEntitiesSucceeded({ data: response.data, query: request.params }));
  } catch (error) {
    yield put(readEntitiesFailed(error));
  }
}

function* readEntitySaga({ meta }) {
  const { entity, makeRequest, killCache, request } = meta.http;

  if (!killCache) {
    const cachedProject = yield select(readEntityById, entity.id, request.params);
    if (cachedProject) return;
  }

  try {
    yield put(readEntityStarted());

    const response = yield makeRequest(request);

    yield put(updateDatabase({ data: response.data }));
    yield put(readEntitySucceeded({ data: response.data }));
  } catch (error) {
    yield put(readEntityFailed(error));
  }
}

function* updateEntitySaga({ meta }) {
  try {
    yield put(updateEntityStarted());

    const { makeRequest, request, successCb } = meta.http;
    const response = yield makeRequest(request);

    yield put(updateDatabase({ data: response.data }));
    yield put(updateEntitySucceeded({ data: response.data }));
    if (successCb) successCb();
  } catch (error) {
    yield put(updateEntityFailed(error));
  }
}

function* deleteEntitySaga({ meta }) {
  try {
    const { makeRequest, request, successCb } = meta.http;

    yield put(deleteEntityStarted());
    yield makeRequest(request);
    yield put(clearDatabase());
    yield put(deleteEntitySucceeded());
    if (successCb) successCb();
  } catch (error) {
    yield put(deleteEntityFailed(error));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(CREATE_ENTITY_REQUESTED, createEntitySaga);
  yield takeLatest(READ_ENTITY_REQUESTED, readEntitySaga);
  yield takeLatest(READ_ENTITIES_REQUESTED, readEntitiesSaga);
  yield takeLatest(UPDATE_ENTITY_REQUESTED, updateEntitySaga);
  yield takeLatest(DELETE_ENTITY_REQUESTED, deleteEntitySaga);
}
