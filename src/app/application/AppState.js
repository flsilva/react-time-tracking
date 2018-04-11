import auth from './auth/AuthState';
import { reducer as jsonApi } from '../infrastructure/jsonapi-redux-client';
import stopwatches from './stopwatches/StopwatchState';
import timeLogs from './time-logs/TimeLogState';

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
  jsonApi,
  stopwatches,
  timeLogs,
};
