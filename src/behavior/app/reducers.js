import projects from './projects/ProjectReducers';
import auth from './auth/AuthReducers';
import database from './DatabaseReducers';

const reducers = {
  auth,
  database,
  projects,
};

export default reducers;
