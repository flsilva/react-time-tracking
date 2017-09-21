import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { Router, browserHistory } from 'react-router';
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import { init as initApi } from './behavior/app/api/ApiConfig';
import appReducers from './behavior/app/reducers';
import appSagas from './behavior/app/sagas';
import Layout from './ui/Layout';
import WebsiteLayout from './behavior/website/WebsiteLayout';
import FaqScreen from './ui/website/faq/FaqScreen';
import LandingScreenContainer from './behavior/website/landing/LandingScreenContainer';
import AppLayout from './behavior/app/AppLayout';
import SignUpScreenContainer from './behavior/app/auth/SignUpScreenContainer';
import { restoreSession } from './behavior/app/auth/restore-session/RestoreSessionActions';
import SignUpSuccessScreen from './ui/app/auth/SignUpSuccessScreen';
import SignUpConfirmationScreenContainer from './behavior/app/auth/SignUpConfirmationScreenContainer';
import SignInScreenContainer from './behavior/app/auth/SignInScreenContainer';
import SignOutScreenContainer from './behavior/app/auth/SignOutScreenContainer';
import DashboardSectionContainer from './behavior/app/dashboard/DashboardSectionContainer';
import ProjectListScreenContainer from './behavior/app/projects/ProjectListScreenContainer';
import ProjectFormScreenContainer from './behavior/app/projects/ProjectFormScreenContainer';
import withPagination from './behavior/app/utils/withPagination';

import './index.css';

const reducers = combineReducers({
  ...appReducers,
  routing: routerReducer,
});

const sagaMiddleware = createSagaMiddleware();
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
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(appSagas);
initApi(store.dispatch, store.getState);

const history = syncHistoryWithStore(browserHistory, store);

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  authenticatingSelector: state => state.auth.restoreSession.isConnecting,
  predicate: auth => !auth.restoreSession.isConnecting && auth.user,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/sign-in',
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
});

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  authenticatingSelector: state => state.auth.restoreSession.isConnecting,
  predicate: auth => !auth.restoreSession.isConnecting && !auth.user,
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
      indexRoute: { component: LandingScreenContainer },
      childRoutes: [
        { path: '/faq', component: FaqScreen },
      ],
    },
    {
      component: AppLayout,
      childRoutes: [
        { path: '/sign-out', component: SignOutScreenContainer },
        {
          component: NotAuthenticatedAppContainer,
          childRoutes: [
            { path: '/sign-up', component: SignUpScreenContainer },
            { path: '/sign-up/success', component: SignUpSuccessScreen },
            { path: '/sign-up/confirmation', component: SignUpConfirmationScreenContainer },
            { path: '/sign-in', component: SignInScreenContainer },
          ],
        },
        {
          component: AuthenticatedAppContainer,
          childRoutes: [
            { path: '/app', component: DashboardSectionContainer },
            { path: '/app/projects',
              component: withPagination(ProjectListScreenContainer),
            },
            { path: '/app/projects/new', component: ProjectFormScreenContainer },
            { path: '/app/projects/:projectId', component: ProjectFormScreenContainer },
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
