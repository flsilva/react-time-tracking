import { all } from 'redux-saga/effects';
import { bindActionsToSagas as bindAuthActionsToSagas } from './auth/AuthActions';
import { bindActionsToSagas as bindEmailSignInActionsToSagas } from './auth/email/EmailSignInActions';
import { bindActionsToSagas as bindEmailSignUpActionsToSagas } from './auth/email/EmailSignUpActions';
import { bindActionsToSagas as bindRestoreSessionActionsToSagas } from './auth/restore-session/RestoreSessionActions';
import { bindActionsToSagas as bindSignOutActionsToSagas } from './auth/sign-out/SignOutActions';
import { bindActionsToSagas as bindProjectActionsToSagas } from './projects/ProjectActions';
import { bindActionsToSagas as bindStopwatchActionsToSagas } from './stopwatch/StopwatchActions';

// eslint-disable-next-line import/prefer-default-export
export function* sagas() {
  yield all([
    bindAuthActionsToSagas(),
    bindEmailSignInActionsToSagas(),
    bindEmailSignUpActionsToSagas(),
    bindRestoreSessionActionsToSagas(),
    bindSignOutActionsToSagas(),
    bindStopwatchActionsToSagas(),
    bindProjectActionsToSagas(),
  ]);
}
