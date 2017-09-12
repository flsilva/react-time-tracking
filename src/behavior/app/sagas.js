import { all } from 'redux-saga/effects'
import { getProjectSagaWatcher } from './projects/ProjectActions';

export default function* appSaga() {
  yield all([
    getProjectSagaWatcher(),
  ])
}
