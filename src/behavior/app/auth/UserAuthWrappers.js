import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

// Redirects to /sign-in by default
export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  authenticatingSelector: state => state.auth.restoreSession.isConnecting,
  predicate: auth => !auth.restoreSession.isConnecting && auth.user,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/sign-in',
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
});

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  authenticatingSelector: state => state.auth.restoreSession.isConnecting,
  predicate: auth => !auth.restoreSession.isConnecting && !auth.user,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/app',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated', // a nice name for this auth check
});
