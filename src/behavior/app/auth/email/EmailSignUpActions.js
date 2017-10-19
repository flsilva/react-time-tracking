import { put, takeLatest } from 'redux-saga/effects';

const EMAIL_SIGN_UP_REQUESTED = 'app/auth/email/sign-up/requested';
export const EMAIL_SIGN_UP_STARTED = 'app/auth/email/sign-up/started';
export const EMAIL_SIGN_UP_SUCCEEDED = 'app/auth/email/sign-up/suceeded';
export const EMAIL_SIGN_UP_FAILED = 'app/auth/email/sign-up/failed';

export const emailSignUp = (data, successCb) => {
  if (!data) throw new Error('Argument <data> must not be null.');

  const { email, password, confirmPassword } = data;

  if (!data.email) throw new Error('Argument <data.email> must not be null.');
  if (!data.password) throw new Error('Argument <data.password> must not be null.');
  if (!data.confirmPassword) throw new Error('Argument <data.confirmPassword> must not be null.');

  return {
    type: EMAIL_SIGN_UP_REQUESTED,
    meta: {
      http: {
        request: {
          data: {
            confirm_success_url: 'http://127.0.0.1:3001/sign-up/confirmation',
            email,
            password,
            password_confirmation: confirmPassword,
          },
          method: 'POST',
          url: 'auth/',
        },
        successCb,
      },
    },
  };
};

const emailSignUpStarted = () => ({ type: EMAIL_SIGN_UP_STARTED });
const emailSignUpSucceeded = payload => ({ type: EMAIL_SIGN_UP_SUCCEEDED, payload });
const emailSignUpFailed = payload => ({ type: EMAIL_SIGN_UP_FAILED, payload });

function* emailSignUpSaga({ meta }) {
  try {
    yield put(emailSignUpStarted());
    const { makeRequest, request, successCb } = meta.http;
    const data = yield makeRequest(request);
    yield put(emailSignUpSucceeded(data.data));
    if (successCb) successCb();
  } catch (error) {
    yield put(emailSignUpFailed(error));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(EMAIL_SIGN_UP_REQUESTED, emailSignUpSaga);
}
