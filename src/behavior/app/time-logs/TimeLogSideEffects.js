import { put, select, takeLatest } from 'redux-saga/effects';
import { getEntityById, getEntities } from './TimeLogState';
import {
  CREATE_ENTITY_REQUESTED,
  READ_ENTITY_REQUESTED,
  READ_ENTITIES_REQUESTED,
  UPDATE_ENTITY_REQUESTED,
  DELETE_ENTITY_REQUESTED,
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
} from './TimeLogActions';

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
    const cachedEntity = yield select(getEntityById, entity.id, request.params);
    if (cachedEntity) return;
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
  const params = request.params ? [request.params] : undefined;

  if (!killCache) {
    const cachedEntities = yield select(getEntities, params);
    if (cachedEntities && cachedEntities.length) return;
  }

  try {
    yield put(readEntitiesStarted());

    const data = yield makeRequest(request);

    yield put(updateDatabase(data));
    yield put(readEntitiesSucceeded({ data, query: request.params }));
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
