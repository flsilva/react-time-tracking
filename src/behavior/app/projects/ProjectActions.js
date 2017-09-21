import { call, put, select, takeLatest } from 'redux-saga/effects';
import { readEntityById, readEntitiesByQueries } from './ProjectReducers';
import { getUser } from '../auth/AuthReducers';
import { getFetcher } from '../api/ApiConfig';
import { extractApiErrors } from '../api/ApiErrors';

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

const clearDatabase = () => ({ type: CLEAR_DATABASE });
const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

export const createEntity = (data, successCb) => ({
  type: CREATE_ENTITY_REQUESTED,
  payload: {
    data,
  },
  meta: { successCb },
});
const createEntityStarted = () => ({ type: CREATE_ENTITY_STARTED });
const createEntitySucceeded = payload => ({ type: CREATE_ENTITY_SUCCEEDED, payload });
const createEntityFailed = payload => ({ type: CREATE_ENTITY_FAILED, payload });

export const readEntity = (id, query, killCache) => (
  { type: READ_ENTITY_REQUESTED, payload: { id, query }, meta: { killCache } }
);
const readEntityStarted = () => ({ type: READ_ENTITY_STARTED });
const readEntitySucceeded = payload => ({ type: READ_ENTITY_SUCCEEDED, payload });
const readEntityFailed = payload => ({ type: READ_ENTITY_FAILED, payload });

export const readEntities = (query, killCache) => (
  { type: READ_ENTITIES_REQUESTED, payload: { query }, meta: { killCache } }
);
const readEntitiesStarted = () => ({ type: READ_ENTITIES_STARTED });
const readEntitiesSucceeded = payload => ({ type: READ_ENTITIES_SUCCEEDED, payload });
const readEntitiesFailed = payload => ({ type: READ_ENTITIES_FAILED, payload });

export const updateEntity = (id, data, successCb) => ({
  type: UPDATE_ENTITY_REQUESTED,
  payload: {
    id,
    data,
  },
  meta: { successCb },
});
const updateEntityStarted = () => ({ type: UPDATE_ENTITY_STARTED });
const updateEntitySucceeded = payload => ({ type: UPDATE_ENTITY_SUCCEEDED, payload });
const updateEntityFailed = payload => ({ type: UPDATE_ENTITY_FAILED, payload });

export const deleteEntity = (id, successCb) => (
  { type: DELETE_ENTITY_REQUESTED, payload: { id }, meta: { successCb } }
);
const deleteEntityStarted = () => ({ type: DELETE_ENTITY_STARTED });
const deleteEntitySucceeded = payload => ({ type: DELETE_ENTITY_SUCCEEDED, payload });
const deleteEntityFailed = payload => ({ type: DELETE_ENTITY_FAILED, payload });

const createEntityPromise = (data, userId) => {
  const normalizedData = {
    data: {
      type: 'projects',
      attributes: data,
      relationships: {
        author: {
          data: {
            id: userId,
            type: 'users',
          },
        },
      },
    },
  };

  const opts = {
    body: JSON.stringify(normalizedData),
    method: 'POST',
  };

  const path = 'projects';

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* createEntitySaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!action.payload.data) {
    throw new Error('Argument <action.payload.data> must not be null.');
  }

  try {
    yield put(createEntityStarted());

    const user = yield select(getUser);
    const data = yield call(createEntityPromise, action.payload.data, user.id);

    yield put(clearDatabase());
    yield put(updateDatabase({ data }));
    yield put(createEntitySucceeded({ data }));
    if (action.meta.successCb) action.meta.successCb();
  } catch (error) {
    yield put(createEntityFailed(extractApiErrors(error)));
  }
}

const deleteEntityPromise = (id) => {
  const opts = {
    method: 'DELETE',
  };

  const path = `projects/${id}`;

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* deleteEntitySaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!action.payload.id) {
    throw new Error('Argument <action.payload.id> must not be null.');
  }

  try {
    yield put(deleteEntityStarted());

    const data = yield call(deleteEntityPromise, action.payload.id);

    yield put(clearDatabase());
    yield put(deleteEntitySucceeded({ data }));
    if (action.meta.successCb) action.meta.successCb();
  } catch (error) {
    yield put(deleteEntityFailed(extractApiErrors(error)));
  }
}

const readEntitiesPromise = (query) => {
  const opts = {
    method: 'GET',
  };

  const path = `projects/${query}`;

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* readEntitiesSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!action.payload.query) {
    throw new Error('Argument <action.payload.query> must not be null.');
  }

  if (!action.meta.killCache) {
    const cachedProjects = yield select(
      readEntitiesByQueries,
      [action.payload.query],
    );

    if (cachedProjects && cachedProjects.length) return;
  }

  try {
    yield put(readEntitiesStarted());

    const data = yield call(readEntitiesPromise, action.payload.query);

    yield put(updateDatabase({ data }));
    yield put(readEntitiesSucceeded({ data, query: action.payload.query }));
  } catch (error) {
    yield put(readEntitiesFailed(extractApiErrors(error)));
  }
}

const readEntityPromise = (id, query = '') => {
  const opts = {
    method: 'GET',
  };

  const path = `projects/${id}${query}`;

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* readEntitySaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!action.payload.id) {
    throw new Error('Argument <action.payload.id> must not be null.');
  }

  if (!action.meta.killCache) {
    const cachedProject = yield select(readEntityById, action.payload.id, action.payload.query);

    if (cachedProject) {
      yield put(readEntitySucceeded(cachedProject));
      return;
    }
  }

  try {
    yield put(readEntityStarted());

    const data = yield call(readEntityPromise, action.payload.id, action.payload.query);

    yield put(updateDatabase({ data }));
    yield put(readEntitySucceeded({ data }));
  } catch (error) {
    yield put(readEntityFailed(extractApiErrors(error)));
  }
}

const updateEntityPromise = (id, data) => {
  const normalizedData = {
    data: {
      id,
      type: 'projects',
      attributes: data,
    },
  };

  const opts = {
    body: JSON.stringify(normalizedData),
    method: 'PATCH',
  };

  const path = `projects/${id}`;

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* updateEntitySaga({ payload, meta }) {
  if (!payload) throw new Error('Argument <action.payload> must not be null.');
  if (!payload.id) {
    throw new Error('Argument <action.payload.id> must not be null.');
  }
  if (!payload.data) {
    throw new Error('Argument <action.payload.data> must not be null.');
  }

  try {
    yield put(updateEntityStarted());

    const data = yield call(updateEntityPromise, payload.id, payload.data);

    yield put(updateDatabase({ data }));
    yield put(updateEntitySucceeded({ data }));
    if (meta.successCb) meta.successCb();
  } catch (error) {
    yield put(updateEntityFailed(extractApiErrors(error)));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(CREATE_ENTITY_REQUESTED, createEntitySaga);
  yield takeLatest(READ_ENTITY_REQUESTED, readEntitySaga);
  yield takeLatest(READ_ENTITIES_REQUESTED, readEntitiesSaga);
  yield takeLatest(UPDATE_ENTITY_REQUESTED, updateEntitySaga);
  yield takeLatest(DELETE_ENTITY_REQUESTED, deleteEntitySaga);
}
