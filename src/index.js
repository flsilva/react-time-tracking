import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import { init as initApi } from './behavior/app/api/ApiConfig';
import appReducers from './behavior/app/reducers';
import Layout from './ui/Layout';
import WebsiteLayout from './behavior/website/WebsiteLayout';
import FaqSection from './ui/website/faq/FaqSection';
import LandingSectionContainer from './behavior/website/landing/LandingSectionContainer';
import AppLayout from './behavior/app/AppLayout';
import SignUpSectionContainer from './behavior/app/auth/SignUpSectionContainer';
import { restoreSession } from './behavior/app/auth/restore-session/RestoreSessionActions';
import SignUpSuccessSection from './ui/app/auth/SignUpSuccessSection';
import SignUpConfirmationContainer from './behavior/app/auth/SignUpConfirmationContainer';
import SignInSectionContainer from './behavior/app/auth/SignInSectionContainer';
import SignOutSectionContainer from './behavior/app/auth/SignOutSectionContainer';
import DashboardSectionContainer from './behavior/app/dashboard/DashboardSectionContainer';
import ProjectsSectionContainer from './behavior/app/projects/ProjectsSectionContainer';
import ProjectFormSectionContainer from './behavior/app/projects/ProjectFormSectionContainer';

// import 'react-toolbox/lib/commons.css'
// import './index.css'

const reducers = combineReducers({
  ...appReducers,
  routing: routerReducer,
});

const routingMiddleware = routerMiddleware(browserHistory);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware,
    ),
  ),
);

initApi(store.dispatch, store.getState);

const history = syncHistoryWithStore(browserHistory, store);

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  authenticatingSelector: state => state.auth.restoreSession.isFetching,
  predicate: auth => !auth.restoreSession.isFetching && auth.user,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/sign-in',
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
});

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  authenticatingSelector: state => state.auth.restoreSession.isFetching,
  predicate: auth => !auth.restoreSession.isFetching && !auth.user,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/app',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated', // a nice name for this auth check
});

// const AuthenticatedAppContainer = UserIsAuthenticated((props) => props.children)
const AuthenticatedAppContainer = UserIsAuthenticated(props =>
  React.cloneElement(props.children, { user: props.authData.user }),
);
const NotAuthenticatedAppContainer = UserIsNotAuthenticated(props => props.children);

// eslint-disable-next-line import/prefer-default-export
export const routes = {
  component: Layout,
  childRoutes: [
    {
      path: '/',
      component: WebsiteLayout,
      indexRoute: { component: LandingSectionContainer },
      childRoutes: [
        { path: '/faq', component: FaqSection },
      ],
    },
    {
      component: AppLayout,
      childRoutes: [
        { path: '/sign-out', component: SignOutSectionContainer },
        {
          component: NotAuthenticatedAppContainer,
          childRoutes: [
            { path: '/sign-up', component: SignUpSectionContainer },
            { path: '/sign-up/success', component: SignUpSuccessSection },
            { path: '/sign-up/confirmation', component: SignUpConfirmationContainer },
            { path: '/sign-in', component: SignInSectionContainer },
          ],
        },
        {
          component: AuthenticatedAppContainer,
          childRoutes: [
            { path: '/app', component: DashboardSectionContainer },
            { path: '/app/projects', component: ProjectsSectionContainer },
            { path: '/app/projects/new', component: ProjectFormSectionContainer },
            { path: '/app/projects/:projectId', component: ProjectFormSectionContainer },
          ],
        },
      ],
    },
  ],
};

store.dispatch(restoreSession()).catch((error) => {
  // eslint-disable-next-line no-console
  console.log('AppContainer().store.dispatch(restoreSession()).catch() - error: ', error);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
