import { all } from 'redux-saga/effects'
import { bindActionsToSagas as bindProjectActionsToSagas } from './projects/ProjectActions';
import { bindActionsToSagas as bindStopwatchActionsToSagas } from './timer/TimerActions';

export default function* appSaga() {
  yield all([
    bindStopwatchActionsToSagas(),
    bindProjectActionsToSagas(),
  ])
}
