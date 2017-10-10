import { call, put, takeLatest } from 'redux-saga/effects';
import { getFetcher } from '../../api/ApiConfig';
import { extractApiErrors } from '../../api/ApiErrors';

const EMAIL_SIGN_UP_REQUESTED = 'EMAIL_SIGN_UP_REQUESTED';
export const EMAIL_SIGN_UP_STARTED = 'EMAIL_SIGN_UP_STARTED';
export const EMAIL_SIGN_UP_SUCCEEDED = 'EMAIL_SIGN_UP_SUCCEEDED';
export const EMAIL_SIGN_UP_FAILED = 'EMAIL_SIGN_UP_FAILED';

export const emailSignUp = (payload, successCb) => ({
  meta: { successCb },
  payload,
  type: EMAIL_SIGN_UP_REQUESTED,
});
const emailSignUpStarted = () => ({ type: EMAIL_SIGN_UP_STARTED });
const emailSignUpSucceeded = payload => ({ type: EMAIL_SIGN_UP_SUCCEEDED, payload });
const emailSignUpFailed = payload => ({ type: EMAIL_SIGN_UP_FAILED, payload });

const emailSignUpPromise = payload => getFetcher().post('auth', payload);

function* emailSignUpSaga(action) {
  try {
    yield put(emailSignUpStarted());
    const { email, password, confirmPassword } = action.payload;
    const payload = {
      confirm_success_url: 'http://127.0.0.1:3001/sign-up/confirmation',
      email,
      password,
      password_confirmation: confirmPassword,
    };
    const response = yield call(emailSignUpPromise, payload);
    yield put(emailSignUpSucceeded(response.data.data));
    if (action.meta && action.meta.successCb) action.meta.successCb();
  } catch (error) {
    yield put(emailSignUpFailed(extractApiErrors(error.response.data)));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(EMAIL_SIGN_UP_REQUESTED, emailSignUpSaga);
}
