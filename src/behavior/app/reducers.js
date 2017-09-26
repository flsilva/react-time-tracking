import auth from './auth/AuthReducers';
import database from './DatabaseReducers';
import projects from './projects/ProjectReducers';
import timer from './timer/TimerReducers';

const reducers = {
  auth,
  database,
  projects,
  timer,
};

export default reducers;
