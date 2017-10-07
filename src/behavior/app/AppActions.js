import { all, put, takeLatest } from 'redux-saga/effects'
import { bindActionsToSagas as bindAuthActionsToSagas } from './auth/AuthActions';
import { bindActionsToSagas as bindEmailSignInActionsToSagas } from './auth/email/EmailSignInActions';
import { bindActionsToSagas as bindRestoreSessionActionsToSagas } from './auth/restore-session/RestoreSessionActions';
import { bindActionsToSagas as bindSignOutActionsToSagas } from './auth/sign-out/SignOutActions';
import { bindActionsToSagas as bindProjectActionsToSagas } from './projects/ProjectActions';
import { bindActionsToSagas as bindStopwatchActionsToSagas } from './stopwatch/StopwatchActions';
import { restoreSession } from './auth/restore-session/RestoreSessionActions';
import { getTokenFromLocalStorage } from './auth/AuthReducers';
import { init as initAppApi } from './api/ApiConfig';
import { init as initAppState } from './reducers';

export const INIT_APP = 'INIT_APP';
export const initApp = payload => ({ type: INIT_APP, payload });

function* initAppSaga(action) {
  const { store } = action.payload;

  initAppState(store);
  initAppApi(store);

  const token = getTokenFromLocalStorage();
  if (token) yield put(restoreSession());
}

function* bindActionsToSagas() {
  yield takeLatest(INIT_APP, initAppSaga);
}

export function* sagas() {
  yield all([
    bindActionsToSagas(),
    bindAuthActionsToSagas(),
    bindEmailSignInActionsToSagas(),
    bindRestoreSessionActionsToSagas(),
    bindSignOutActionsToSagas(),
    bindStopwatchActionsToSagas(),
    bindProjectActionsToSagas(),
  ])
}
