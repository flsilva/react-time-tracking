import { reducer as form } from 'redux-form';
import auth from './auth/AuthReducers';
import database from './DatabaseReducers';
import projects from './projects/ProjectReducers';
import stopwatches from './stopwatch/StopwatchReducers';

export const observeStore = (store, select, onChange) => {
  let currentState;

  function handleChange() {
    const nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};

export const reducers = {
  auth,
  database,
  form,
  projects,
  stopwatches,
};
