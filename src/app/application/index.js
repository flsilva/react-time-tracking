import { applyMiddleware } from 'redux';
import { observeStore } from './AppState';
import initAuth, { middleware as authMiddleware } from './auth';
import initNavigation from './navigation';
import { middleware as netMiddleware } from './shared/net';

export default (store, browserHistory) => {
  initAuth(store, observeStore);
  initNavigation(browserHistory);
};

export const appMiddleware = applyMiddleware(authMiddleware, netMiddleware);
