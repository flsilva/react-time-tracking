import { put, select, takeLatest } from 'redux-saga/effects';
import { updateResourceDatabase } from '../responses/resources';
import { hasQueryMetaResult } from './queries';
import {
  httpRequestCached,
  httpRequestStarted,
  httpRequestSucceeded,
  httpRequestFailed,
  HTTP_REQUEST_REQUESTED,
} from './';

function* httpRequestSaga({ meta }) {
  const { makeRequest, request } = meta.http;
  const { killCache, lifecycle, query } = request;

  if (!killCache) {
    const resourceExists = yield select(hasQueryMetaResult, query);
    if (resourceExists) {
      yield put(httpRequestCached());
      return;
    }
  }

  try {
    // yield put(readCollectionStarted());
    yield put(httpRequestStarted(request));

    console.log('httpRequestSaga() - lifecycle: ', lifecycle);

    if (lifecycle && lifecycle.started && lifecycle.started[0].fn) {
      if (lifecycle.started[0].isAction) {
        yield put(lifecycle.started[0].fn.apply(null, lifecycle.started[0].args));
      } else {
        lifecycle.started[0].fn.apply(null, lifecycle.started[0].args);
      }
    }

    /*
    if (lifecycle.started) {
      lifecycle.started.forEach((cb) => {
        yield put(cb());
      });
    }
    */

    const response = yield makeRequest(request);
    const requestResponseWrapper = { request, response };

    console.log('httpRequestSaga() - response: ', response);

    yield put(httpRequestSucceeded(requestResponseWrapper));

    // if (lifecycle.succeeded) yield put(lifecycle.succeeded[0](response));

    if (lifecycle && lifecycle.succeeded && lifecycle.succeeded.beforeUpdateResources) {
      if (lifecycle.succeeded.beforeUpdateResources[0]) {
        if (lifecycle.succeeded.beforeUpdateResources[0].isAction) {
          yield put(lifecycle.succeeded.beforeUpdateResources[0].fn.apply(
            null,
            []
              .concat(lifecycle.succeeded.beforeUpdateResources[0].args)
              .concat([requestResponseWrapper]),
          ));
        } else {
          lifecycle.succeeded.beforeUpdateResources[0].fn.apply(
            null,
            []
              .concat(lifecycle.succeeded.beforeUpdateResources[0].args)
              .concat([requestResponseWrapper]),
          );
        }
      }
    }

    if (!request.ignoreResponse) yield put(updateResourceDatabase({ request, response }));

    if (lifecycle && lifecycle.succeeded && lifecycle.succeeded.afterUpdateResources) {
      if (lifecycle.succeeded.afterUpdateResources[0]) {
        if (lifecycle.succeeded.afterUpdateResources[0].isAction) {
          yield put(lifecycle.succeeded.afterUpdateResources[0].fn.apply(
            null,
            []
              .concat(lifecycle.succeeded.afterUpdateResources[0].args)
              .concat([requestResponseWrapper]),
          ));
        } else {
          lifecycle.succeeded.afterUpdateResources[0].fn.apply(
            null,
            []
              .concat(lifecycle.succeeded.afterUpdateResources[0].args)
              .concat([requestResponseWrapper]),
          );
        }
      }

      if (lifecycle.succeeded.afterUpdateResources[1]) {
        if (lifecycle.succeeded.afterUpdateResources[1].isAction) {
          yield put(lifecycle.succeeded.afterUpdateResources[1].fn.apply(
            null,
            []
              .concat(lifecycle.succeeded.afterUpdateResources[1].args)
              .concat([requestResponseWrapper]),
          ));
        } else {
          lifecycle.succeeded.afterUpdateResources[1].fn.apply(
            null,
            []
              .concat(lifecycle.succeeded.afterUpdateResources[1].args)
              .concat([requestResponseWrapper]),
          );
        }
      }
    }

    // yield put(updateDatabase(response));
    // yield put(readCollectionSucceeded({ response, query }));
  } catch (error) {
    console.log('httpRequestSaga() - error: ', error);
    // if (lifecycle.failed) yield put(lifecycle.failed[0](error));
    yield put(httpRequestFailed({ error, request }));
    if (lifecycle && lifecycle.failed && lifecycle.failed[0]) {
      if (lifecycle.failed[0].isAction) {
        yield put(lifecycle.failed[0].fn());
      } else {
        lifecycle.failed[0].fn();
      }
    }
    // yield put(readCollectionFailed(error));
  }
}

export default function* () {
  yield takeLatest(HTTP_REQUEST_REQUESTED, httpRequestSaga);
}
