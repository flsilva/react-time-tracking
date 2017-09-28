import auth from './auth/AuthReducers';
import database from './DatabaseReducers';
import projects from './projects/ProjectReducers';

const reducers = {
  auth,
  database,
  projects,
};

export default reducers;
