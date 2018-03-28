export const EMAIL_SIGN_IN_REQUESTED = 'app/auth/email/sign-in/requested';
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
        resource: {
          method: 'POST',
          payload: { email, password },
          url: 'auth/sign_in/',
        },
      },
    },
  };
};

export const emailSignInStarted = () => ({ type: EMAIL_SIGN_IN_STARTED });
export const emailSignInSucceeded = payload => ({ type: EMAIL_SIGN_IN_SUCCEEDED, payload });
export const emailSignInFailed = payload => ({ type: EMAIL_SIGN_IN_FAILED, payload });
