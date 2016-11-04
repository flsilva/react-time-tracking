import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import appReducers from './behavior/app/reducers'
import Layout from './ui/Layout'
import WebsiteLayout from './behavior/website/WebsiteLayout'
import FaqSection from './ui/website/faq/FaqSection'
import LandingSectionContainer from './behavior/website/landing/LandingSectionContainer'
import AppLayout from './behavior/app/AppLayout'
import SignUpSectionContainer from './behavior/app/auth/SignUpSectionContainer'
import { tokenSignIn } from './behavior/app/auth/Auth.Actions'
import SignUpSuccessSection from './ui/app/auth/SignUpSuccessSection'
import SignUpConfirmationContainer from './behavior/app/auth/SignUpConfirmationContainer'
import LoginSectionContainer from './behavior/app/auth/LoginSectionContainer'
import SignOutSectionContainer from './behavior/app/auth/SignOutSectionContainer'
import DashboardSectionContainer from './behavior/app/dashboard/DashboardSectionContainer'
import ProjectsSectionContainer from './behavior/app/projects/ProjectsSectionContainer'

import 'react-toolbox/lib/commons.css'
//import './index.css'


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
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/sign-in',
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  authenticatingSelector: state => state.auth.isFetching,
  predicate: auth => !auth.isFetching && !auth.user,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/app',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated' // a nice name for this auth check
})

//const AuthenticatedAppContainer = UserIsAuthenticated((props) => props.children)
const AuthenticatedAppContainer = UserIsAuthenticated((props) => {
  console.log('AuthenticatedAppContainer() - props: ', props)
  return React.cloneElement(props.children, { user: props.authData.user })
})
const NotAuthenticatedAppContainer = UserIsNotAuthenticated((props) => props.children)

export const routes = {
  component: Layout,
  childRoutes: [
    {
      path: '/',
      component: WebsiteLayout,
      indexRoute: { component: LandingSectionContainer },
      childRoutes: [
        { path: '/faq', component: FaqSection }
      ]
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
            { path: '/sign-in', component: LoginSectionContainer },
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
  ]
}

store.dispatch(tokenSignIn()).catch(error => { console.log('AppContainer().store.dispatch(tokenSignIn()).catch()') })

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
