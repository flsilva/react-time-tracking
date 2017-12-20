import { put, select, takeLatest } from 'redux-saga/effects';
import { getEntitiesByQuery, hasEntity } from './ProjectState';
import {
  // CREATE_ENTITY_REQUESTED,
  // READ_ENTITY_REQUESTED,
  // READ_ENTITIES_REQUESTED,
  // UPDATE_ENTITY_REQUESTED,
  // DELETE_ENTITY_REQUESTED,
  createEntityFailed,
  createEntityStarted,
  createEntitySucceeded,
  readEntityFailed,
  readEntityStarted,
  readEntitySucceeded,
  readEntitiesFailed,
  readEntitiesStarted,
  readEntitiesSucceeded,
  updateEntityFailed,
  updateEntityStarted,
  updateEntitySucceeded,
  deleteEntityFailed,
  deleteEntityStarted,
  deleteEntitySucceeded,
  clearDatabase,
  updateDatabase,
} from './ProjectActions';
import {
  CREATE_ENTITY_REQUESTED,
  READ_ENTITY_REQUESTED,
  READ_ENTITIES_REQUESTED,
  UPDATE_ENTITY_REQUESTED,
  DELETE_ENTITY_REQUESTED,
} from './types';

function* createEntitySaga({ meta }) {
  try {
    yield put(createEntityStarted());

    const { makeRequest, request, successCb } = meta.http;
    const data = yield makeRequest(request);

    yield put(clearDatabase());
    yield put(updateDatabase(data));
    yield put(createEntitySucceeded());
    if (successCb) successCb();
  } catch (error) {
    yield put(createEntityFailed(error));
  }
}

function* readEntitySaga({ meta }) {
  const { entity, makeRequest, killCache, request } = meta.http;

  if (!killCache) {
    const entityExists = yield select(hasEntity, entity.id);
    if (entityExists) return;
  }

  try {
    yield put(readEntityStarted());

    const data = yield makeRequest(request);

    yield put(updateDatabase(data));
    yield put(readEntitySucceeded());
  } catch (error) {
    yield put(readEntityFailed(error));
  }
}

function* readEntitiesSaga({ meta }) {
  const { makeRequest, killCache, request } = meta.http;

  if (!killCache) {
    const cachedResult = yield select(getEntitiesByQuery, request.params);
    if (cachedResult) return;
  }

  try {
    yield put(readEntitiesStarted());

    const response = yield makeRequest(request);

    yield put(updateDatabase(response));
    yield put(readEntitiesSucceeded({ response, query: request.params }));
  } catch (error) {
    yield put(readEntitiesFailed(error));
  }
}

function* updateEntitySaga({ meta }) {
  try {
    yield put(updateEntityStarted());

    const { makeRequest, request, successCb } = meta.http;
    const data = yield makeRequest(request);

    yield put(updateDatabase(data));
    yield put(updateEntitySucceeded());
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

export default function* () {
  yield takeLatest(CREATE_ENTITY_REQUESTED, createEntitySaga);
  yield takeLatest(READ_ENTITY_REQUESTED, readEntitySaga);
  yield takeLatest(READ_ENTITIES_REQUESTED, readEntitiesSaga);
  yield takeLatest(UPDATE_ENTITY_REQUESTED, updateEntitySaga);
  yield takeLatest(DELETE_ENTITY_REQUESTED, deleteEntitySaga);
}
