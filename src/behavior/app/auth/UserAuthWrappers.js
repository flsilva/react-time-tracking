import React from 'react';
// import { routerActions } from 'react-router-redux';
// import { UserAuthWrapper } from 'redux-auth-wrapper';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import CircularProgress from 'material-ui/CircularProgress';

const locationHelper = locationHelperBuilder({});

const loadingContainerStyles = {
  alignItems: 'center',
  display: 'flex',
  height: window.innerHeight,
  justifyContent: 'center',
};

const AuthenticatingLoading = () => (
  <div style={loadingContainerStyles}>
    <CircularProgress
      color={'rgb(0, 188, 212)'}
      size={50}
      thickness={4}
      style={{ transform: 'translate(0, -50%)' }}
    />
  </div>
);

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.user !== null,
  authenticatingSelector: state => state.auth.restoreSession.isConnecting,
  wrapperDisplayName: 'UserIsAuthenticated',
};

export const UserIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const UserIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: AuthenticatingLoading,
  redirectPath: '/account/sign-in',
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => (
    state.auth.user === null && state.auth.restoreSession.isConnecting === false
  ),
  wrapperDisplayName: 'UserIsNotAuthenticated',
};

export const UserIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const UserIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => (
    locationHelper.getRedirectQueryParam(ownProps) || '/app'
  ),
  allowRedirectBack: false,
});

/*
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
*/
