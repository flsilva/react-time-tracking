import React from 'react';
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
