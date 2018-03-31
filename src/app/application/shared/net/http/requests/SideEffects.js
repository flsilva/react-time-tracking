import { put, select, takeLatest } from 'redux-saga/effects';
import { updateResourceDatabase } from '../resources/Services';
import { hasQueryMetaResult } from './queries/Repository';
import { httpRequestSucceeded } from './Services';
import { HTTP_REQUEST_REQUESTED } from './Types';

function* httpRequestSaga({ meta }) {
  const { makeRequest, request } = meta.http;
  const { killCache, lifecycle, query } = request;

  if (!killCache) {
    const resourceExists = yield select(hasQueryMetaResult, query);
    if (resourceExists) return;
  }

  try {
    // yield put(readCollectionStarted());

    console.log('httpRequestSaga() - lifecycle: ', lifecycle);

    if (lifecycle.started) yield put(lifecycle.started[0]());

    /*
    if (lifecycle.started) {
      lifecycle.started.forEach((cb) => {
        yield put(cb());
      });
    }
    */

    const response = yield makeRequest(request);

    console.log('httpRequestSaga() - response: ', response);

    yield put(httpRequestSucceeded({ request, response }));

    if (lifecycle.succeeded) yield put(lifecycle.succeeded[0](response));

    yield put(updateResourceDatabase({ request, response }));

    // yield put(updateDatabase(response));
    // yield put(readCollectionSucceeded({ response, query }));
  } catch (error) {
    if (lifecycle.failed) yield put(lifecycle.failed[0](error));
    // yield put(readCollectionFailed(error));
  }
}

export default function* () {
  yield takeLatest(HTTP_REQUEST_REQUESTED, httpRequestSaga);
}
