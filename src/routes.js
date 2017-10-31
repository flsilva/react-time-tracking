import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
  UserIsAuthenticatedRedir,
  UserIsNotAuthenticatedRedir,
} from './behavior/app/auth/UserAuthWrappers';
import Layout from './ui/Layout';
import WebsiteLayout from './behavior/website/WebsiteLayout';
import FaqScreen from './ui/website/faq/FaqScreen';
import LandingScreenContainer from './behavior/website/landing/LandingScreenContainer';
import AppLayoutContainer from './behavior/app/AppLayoutContainer';
import SignUpScreenContainer from './behavior/app/auth/SignUpScreenContainer';
import SignUpSuccessScreen from './ui/app/auth/SignUpSuccessScreen';
import SignUpConfirmationScreenContainer from './behavior/app/auth/SignUpConfirmationScreenContainer';
import SignInScreenContainer from './behavior/app/auth/SignInScreenContainer';
import SignOutScreenContainer from './behavior/app/auth/SignOutScreenContainer';
import StopwatchScreenContainer from './behavior/app/stopwatch/StopwatchScreenContainer';
import ProjectListScreenContainerWithPagination from './behavior/app/projects/ProjectListScreenContainerWithPagination';
import ProjectFormScreenContainer from './behavior/app/projects/ProjectFormScreenContainer';
import TimeLogListScreenContainerWithPagination from './behavior/app/time-logs/TimeLogListScreenContainerWithPagination';
import TimeLogFormScreenContainer from './behavior/app/time-logs/TimeLogFormScreenContainer';
import { getRelationshipQuery } from './behavior/app/utils/QueryUtils';

// const AuthenticatedAppContainer = UserIsAuthenticatedRedir(props => props.children);

const AuthenticatedAppContainer = withRouter(
  UserIsAuthenticatedRedir(props => React.cloneElement(props.children, props)),
);

// const NotAuthenticatedAppContainer = UserIsNotAuthenticatedRedir(props => props.children);

const NotAuthenticatedAppContainer = withRouter(
  UserIsNotAuthenticatedRedir(props => React.cloneElement(props.children, props)),
);

const ProjectListScreenContainer = ProjectListScreenContainerWithPagination(3);
const TimeLogListScreenContainer = TimeLogListScreenContainerWithPagination(3);

const ProjectFormScreenContainerWithQuery = props => (
  <ProjectFormScreenContainer getQuery={getRelationshipQuery('author')} {...props} />
);

export default () => (
  <Layout>
    <Switch>
      <Route exact path="/sign-out" component={SignOutScreenContainer} />
      <Route
        path="/"
        exact
        render={() => (
          <WebsiteLayout>
            <Switch>
              <Route exact path="/" component={LandingScreenContainer} />
              <Route path="/faq" component={FaqScreen} />
            </Switch>
          </WebsiteLayout>
        )}
      />
      <Route
        path="/account"
        render={() => (
          <AppLayoutContainer>
            <NotAuthenticatedAppContainer>
              <Switch>
                <Route exact path="/account/sign-in" component={SignInScreenContainer} />
                <Route exact path="/account/sign-up" component={SignUpScreenContainer} />
                <Route exact path="/account/sign-up/success" component={SignUpSuccessScreen} />
                <Route exact path="/account/sign-up/confirmation" component={SignUpConfirmationScreenContainer} />
              </Switch>
            </NotAuthenticatedAppContainer>
          </AppLayoutContainer>
        )}
      />
      <Route
        path="/app"
        render={() => (
          <AppLayoutContainer>
            <AuthenticatedAppContainer>
              <Switch>
                <Route exact path="/app" component={StopwatchScreenContainer} />
                <Route exact path="/app/projects" component={ProjectListScreenContainer} />
                <Route exact path="/app/projects/new" component={ProjectFormScreenContainer} />
                <Route exact path="/app/projects/:projectId" component={ProjectFormScreenContainerWithQuery} />
                <Route exact path="/app/time-logs" component={TimeLogListScreenContainer} />
                <Route exact path="/app/time-logs/new" component={TimeLogFormScreenContainer} />
                <Route exact path="/app/time-logs/:timeLogId" component={TimeLogFormScreenContainer} />
              </Switch>
            </AuthenticatedAppContainer>
          </AppLayoutContainer>
        )}
      />
    </Switch>
  </Layout>
);

/*
export default {
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
      component: AppLayoutContainer,
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
            { path: '/app', component: StopwatchScreenContainer },
            // { path: '/app/projects', component: withPagination(ProjectListScreenContainer) },
            { path: '/app/projects', component: ProjectListScreenContainer },
            { path: '/app/projects/new', component: ProjectFormScreenContainer },
            { path: '/app/projects/:projectId', component: ProjectFormScreenContainerWithQuery },
            // { path: '/app/time-logs', component: withPagination(TimeLogListScreenContainer) },
            { path: '/app/time-logs', component: TimeLogListScreenContainer },
            { path: '/app/time-logs/new', component: TimeLogFormScreenContainer },
            { path: '/app/time-logs/:timeLogId', component: TimeLogFormScreenContainer },
          ],
        },
      ],
    },
  ],
};
*/
