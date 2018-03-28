import { put, takeLatest } from 'redux-saga/effects';
import {
  EMAIL_SIGN_IN_REQUESTED,
  emailSignInFailed,
  emailSignInStarted,
  emailSignInSucceeded,
} from './EmailSignInActions';

function* emailSignInSaga({ meta }) {
  try {
    yield put(emailSignInStarted());
    const { makeRequest, resource } = meta.http;
    const data = yield makeRequest(resource);
    yield put(emailSignInSucceeded(data.data));
  } catch (error) {
    yield put(emailSignInFailed(error));
  }
}

export default function* () {
  yield takeLatest(EMAIL_SIGN_IN_REQUESTED, emailSignInSaga);
}
