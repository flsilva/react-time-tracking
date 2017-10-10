import { call, put, takeLatest } from 'redux-saga/effects';
import { getFetcher } from '../../';
import { extractApiErrors } from '../../api/ApiErrors';

export const EMAIL_SIGN_IN_REQUESTED = 'EMAIL_SIGN_IN_REQUESTED';
export const EMAIL_SIGN_IN_STARTED = 'EMAIL_SIGN_IN_STARTED';
export const EMAIL_SIGN_IN_SUCCEEDED = 'EMAIL_SIGN_IN_SUCCEEDED';
export const EMAIL_SIGN_IN_FAILED = 'EMAIL_SIGN_IN_FAILED';

export const emailSignIn = (email, password) => ({
  type: EMAIL_SIGN_IN_REQUESTED,
  payload: { email, password },
});
const emailSignInStarted = () => ({ type: EMAIL_SIGN_IN_STARTED });
const emailSignInSucceeded = payload => ({ type: EMAIL_SIGN_IN_SUCCEEDED, payload });
const emailSignInFailed = payload => ({ type: EMAIL_SIGN_IN_FAILED, payload });

const emailSignInPromise = payload => getFetcher().post('auth/sign_in', payload);

function* emailSignInSaga(action) {
  try {
    yield put(emailSignInStarted());
    const response = yield call(emailSignInPromise, action.payload);
    yield put(emailSignInSucceeded(response.data.data));
  } catch (error) {
    yield put(emailSignInFailed(extractApiErrors(error.response.data)));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(EMAIL_SIGN_IN_REQUESTED, emailSignInSaga);
}
