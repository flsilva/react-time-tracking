import { all } from 'redux-saga/effects'
import { bindActionsToSagas } from './projects/ProjectActions';

export default function* appSaga() {
  yield all([
    bindActionsToSagas(),
  ])
}
