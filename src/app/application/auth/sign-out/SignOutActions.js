export const SIGN_OUT_REQUESTED = 'app/auth/sign-out/requested';
export const SIGN_OUT_STARTED = 'app/auth/sign-out/started';
export const SIGN_OUT_SUCCEEDED = 'app/auth/sign-out/succeeded';
export const SIGN_OUT_FAILED = 'app/auth/sign-out/failed';

export const signOut = () => ({
  type: SIGN_OUT_REQUESTED,
  meta: {
    http: {
      request: {
        method: 'DELETE',
        url: 'auth/sign_out',
      },
    },
  },
});

export const signOutStarted = () => ({ type: SIGN_OUT_STARTED });
export const signOutSucceeded = payload => ({ type: SIGN_OUT_SUCCEEDED, payload });
export const signOutFailed = payload => ({ type: SIGN_OUT_FAILED, payload });
