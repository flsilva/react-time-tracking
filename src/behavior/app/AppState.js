import { reducer as form } from 'redux-form';
import auth from './auth/AuthState';
import database from './DatabaseState';
import projects from './projects/ProjectState';
import stopwatches from './stopwatch/StopwatchState';

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
