import { applyMiddleware } from 'redux';
import { observeStore } from './AppState';
import initAuth, { middleware as authMiddleware } from './auth';
import { middleware as apiMiddleware } from './api';

export default (store) => {
  initAuth(store, observeStore);
};

export const appMiddleware = applyMiddleware(authMiddleware, apiMiddleware);
