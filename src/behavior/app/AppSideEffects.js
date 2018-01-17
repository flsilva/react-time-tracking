import { all, put, takeLatest } from 'redux-saga/effects';
import { clearCache } from './api/caching/Actions';
import bindAuth from './auth/AuthSideEffects';
import bindEmailSignIn from './auth/email/EmailSignInSideEffects';
import bindEmailSignUp from './auth/email/EmailSignUpSideEffects';
import bindRestoreSession from './auth/restore-session/RestoreSessionSideEffects';
import bindSignOut from './auth/sign-out/SignOutSideEffects';
import bindProject from './projects/ProjectSideEffects';
import bindStopwatch from './stopwatches/StopwatchSideEffects';
import bindTimeLog from './time-logs/TimeLogSideEffects';
import { CLEAR_ENTITIES } from './types';

function* clearEntitiesSaga({ payload }) {
  yield put(clearCache(payload));
}

function* bindApp() {
  yield takeLatest(CLEAR_ENTITIES, clearEntitiesSaga);
}

export default function* () {
  yield all([
    bindApp(),
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
