import { put, takeLatest } from 'redux-saga/effects';

const EMAIL_SIGN_IN_REQUESTED = 'app/auth/email/sign-in/requested';
export const EMAIL_SIGN_IN_STARTED = 'app/auth/email/sign-in/started';
export const EMAIL_SIGN_IN_SUCCEEDED = 'app/auth/email/sign-in/suceeded';
export const EMAIL_SIGN_IN_FAILED = 'app/auth/email/sign-in/failed';

export const emailSignIn = (email, password) => {
  if (!email) throw new Error('Argument <email> must not be null.');
  if (!password) throw new Error('Argument <password> must not be null.');

  return {
    type: EMAIL_SIGN_IN_REQUESTED,
    meta: {
      http: {
        request: {
          data: { email, password },
          method: 'POST',
          url: 'auth/sign_in/',
        },
      },
    },
  };
};

const emailSignInStarted = () => ({ type: EMAIL_SIGN_IN_STARTED });
const emailSignInSucceeded = payload => ({ type: EMAIL_SIGN_IN_SUCCEEDED, payload });
const emailSignInFailed = payload => ({ type: EMAIL_SIGN_IN_FAILED, payload });

function* emailSignInSaga({ meta }) {
  try {
    yield put(emailSignInStarted());
    const { makeRequest, request } = meta.http;
    const data = yield makeRequest(request);
    yield put(emailSignInSucceeded(data.data));
  } catch (error) {
    yield put(emailSignInFailed(error));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(EMAIL_SIGN_IN_REQUESTED, emailSignInSaga);
}
