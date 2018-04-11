export const NEW_TOKEN_RECEIVED = 'app/auth/new-token-received';
export const USER_SIGN_IN_SUCCEEDED = 'app/auth/user/sign-in/succeeded';
export const USER_SIGN_OUT_SUCCEEDED = 'app/auth/user/sign-out/succeeded';

export const newTokenReceived = payload => ({ type: NEW_TOKEN_RECEIVED, payload });
export const userSignInSucceeded = payload => ({ type: USER_SIGN_IN_SUCCEEDED, payload });
export const userSignOutSucceeded = () => ({ type: USER_SIGN_OUT_SUCCEEDED });
