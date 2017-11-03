import { all } from 'redux-saga/effects';
import bindAuth from './auth/AuthSideEffects';
import bindEmailSignIn from './auth/email/EmailSignInSideEffects';
import bindEmailSignUp from './auth/email/EmailSignUpSideEffects';
import bindRestoreSession from './auth/restore-session/RestoreSessionSideEffects';
import bindSignOut from './auth/sign-out/SignOutSideEffects';
import bindProject from './projects/ProjectSideEffects';
import bindStopwatch from './stopwatches/StopwatchSideEffects';
import bindTimeLog from './time-logs/TimeLogSideEffects';

export default function* () {
  yield all([
    bindAuth(),
    bindEmailSignIn(),
    bindEmailSignUp(),
    bindRestoreSession(),
    bindSignOut(),
    bindProject(),
    bindStopwatch(),
    bindTimeLog(),
  ]);
}
