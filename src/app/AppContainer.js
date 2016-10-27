import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import appReducers from './reducers'
import App from './App'
import HomeSectionContainer from './home/HomeSectionContainer'
import SignUpSectionContainer from './auth/SignUpSectionContainer'
import { tokenSignIn } from './auth/Auth.Actions'
import SignUpSuccessSection from '../components/auth/SignUpSuccessSection'
import SignUpConfirmationContainer from './auth/SignUpConfirmationContainer'
import LoginSectionContainer from './auth/LoginSectionContainer'
import SignOutSectionContainer from './auth/SignOutSectionContainer'
import DashboardSectionContainer from './dashboard/DashboardSectionContainer'
import ProjectsSectionContainer from './projects/ProjectsSectionContainer'

const reducers = combineReducers({
  ...appReducers,
  routing: routerReducer
})

const routingMiddleware = routerMiddleware(browserHistory)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware
    )
  )
)

const history = syncHistoryWithStore(browserHistory, store)

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  authenticatingSelector: state => state.auth.isFetching,
  predicate: auth => !auth.isFetching && auth.user,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  //authenticatingSelector: state => state.auth.isFetching,
  predicate: auth => !auth.isFetching && !auth.user,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/app',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated' // a nice name for this auth check
})

const AuthenticatedAppContainer = UserIsAuthenticated((props) => props.children)
const NotAuthenticatedAppContainer = UserIsNotAuthenticated((props) => props.children)

const AppContainer = (props) => (
  <App {...props} />
)

export const routes = {
  path: '/',
  component: AppContainer,
  indexRoute: { component: HomeSectionContainer },
  childRoutes: [
    { path: '/sign-out', component: SignOutSectionContainer },
    {
      component: NotAuthenticatedAppContainer,
      childRoutes: [
        { path: '/sign-up', component: SignUpSectionContainer },
        { path: '/sign-up/success', component: SignUpSuccessSection },
        { path: '/sign-up/confirmation', component: SignUpConfirmationContainer },
        { path: '/login', component: LoginSectionContainer },
      ]
    },
    {
      component: AuthenticatedAppContainer,
      childRoutes: [
        { path: '/app', component: DashboardSectionContainer },
        { path: '/app/projects', component: ProjectsSectionContainer }
      ]
    }
  ]
}

export const Root = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
)

store.dispatch(tokenSignIn()).catch(error => { console.log('AppContainer().store.dispatch(tokenSignIn()).catch()') })
