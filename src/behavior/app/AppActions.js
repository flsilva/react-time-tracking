import { all, put, takeLatest } from 'redux-saga/effects';
import { bindActionsToSagas as bindAuthActionsToSagas, newTokenReceived } from './auth/AuthActions';
import { bindActionsToSagas as bindEmailSignInActionsToSagas } from './auth/email/EmailSignInActions';
import { bindActionsToSagas as bindEmailSignUpActionsToSagas } from './auth/email/EmailSignUpActions';
import { bindActionsToSagas as bindRestoreSessionActionsToSagas, restoreSession } from './auth/restore-session/RestoreSessionActions';
import { bindActionsToSagas as bindSignOutActionsToSagas } from './auth/sign-out/SignOutActions';
import { bindActionsToSagas as bindProjectActionsToSagas } from './projects/ProjectActions';
import { bindActionsToSagas as bindStopwatchActionsToSagas } from './stopwatch/StopwatchActions';
import { getTokenFromLocalStorage } from './auth/AuthReducers';
import { init as initAppApi } from './api/ApiConfig';
import { init as initAppState } from './reducers';

export const INIT_APP = 'INIT_APP';
export const initApp = payload => ({ type: INIT_APP, payload });

function* initAppSaga(action) {
  const { store } = action.payload;
  // TODO: Rethink. We need to read token from LocalStorage before calling
  // initAppState(), which in turn calls initAuthState(), triggering its
  // observeStore()'s callback sending null as token, which then gets written
  // to LocalStorage, so we lose it.
  const token = getTokenFromLocalStorage();
  //

  initAppState(store);
  initAppApi(store);

  if (token) {
    yield put(newTokenReceived(token));
    yield put(restoreSession());
  }
}

function* bindActionsToSagas() {
  yield takeLatest(INIT_APP, initAppSaga);
}

export function* sagas() {
  yield all([
    bindActionsToSagas(),
    bindAuthActionsToSagas(),
    bindEmailSignInActionsToSagas(),
    bindEmailSignUpActionsToSagas(),
    bindRestoreSessionActionsToSagas(),
    bindSignOutActionsToSagas(),
    bindStopwatchActionsToSagas(),
    bindProjectActionsToSagas(),
  ]);
}
