import { put, takeLatest } from 'redux-saga/effects';
import {
  EMAIL_SIGN_UP_REQUESTED,
  emailSignUpFailed,
  emailSignUpStarted,
  emailSignUpSucceeded,
} from './EmailSignUpActions';

function* emailSignUpSaga({ meta }) {
  try {
    yield put(emailSignUpStarted());
    const { makeRequest, resource, successCb } = meta.http;
    const data = yield makeRequest(resource);
    yield put(emailSignUpSucceeded(data.data));
    if (successCb) successCb();
  } catch (error) {
    yield put(emailSignUpFailed(error));
  }
}

export default function* () {
  yield takeLatest(EMAIL_SIGN_UP_REQUESTED, emailSignUpSaga);
}
