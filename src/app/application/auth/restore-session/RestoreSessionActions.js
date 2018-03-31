export const RESTORE_SESSION_REQUESTED = 'app/auth/restore-session/requested';
export const RESTORE_SESSION_STARTED = 'app/auth/restore-session/started';
export const RESTORE_SESSION_SUCCEEDED = 'app/auth/restore-session/succeeded';
export const RESTORE_SESSION_FAILED = 'app/auth/restore-session/failed';

export const restoreSession = () => ({
  type: RESTORE_SESSION_REQUESTED,
  meta: {
    http: {
      request: {
        method: 'GET',
        url: 'auth/validate_token',
      },
    },
  },
});

export const restoreSessionStarted = () => ({ type: RESTORE_SESSION_STARTED });
export const restoreSessionSucceeded = payload => ({ type: RESTORE_SESSION_SUCCEEDED, payload });
export const restoreSessionFailed = payload => ({ type: RESTORE_SESSION_FAILED, payload });
