import { put, takeLatest } from 'redux-saga/effects';
import {
  SIGN_OUT_REQUESTED,
  signOutFailed,
  signOutStarted,
  signOutSucceeded,
} from './SignOutActions';

function* signOutSaga({ meta }) {
  try {
    yield put(signOutStarted());
    const { makeRequest, request } = meta.http;
    yield makeRequest(request);
    yield put(signOutSucceeded());
  } catch (error) {
    yield put(signOutFailed(error));
    yield put(signOutSucceeded());
  }
}

export default function* () {
  yield takeLatest(SIGN_OUT_REQUESTED, signOutSaga);
}
