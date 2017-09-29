import { reducer as form } from 'redux-form'
import auth from './auth/AuthReducers';
import database from './DatabaseReducers';
import projects from './projects/ProjectReducers';
import stopwatches from './timer/TimerReducers';

const reducers = {
  auth,
  database,
  form,
  projects,
  stopwatches,
};

export default reducers;
