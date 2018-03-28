import React from 'react';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import FullHeightCentralizedChildren from '../../../shared/presentation/FullHeightCentralizedChildren';
import CircularLoading from '../../../shared/presentation/CircularLoading';

const locationHelper = locationHelperBuilder({});

const AuthenticatingLoading = () => (
  <FullHeightCentralizedChildren>
    <CircularLoading style={{ transform: 'translate(0, -50%)' }} />
  </FullHeightCentralizedChildren>
);

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.user !== null && state.auth.user !== undefined,
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
    !state.auth.user && !state.auth.restoreSession.isConnecting
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
