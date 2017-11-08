import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import UserProvider from './behavior/UserProvider';
import {
  UserIsAuthenticatedRedir,
  UserIsNotAuthenticatedRedir,
} from './behavior/app/auth/UserAuthWrappers';
import Layout from './ui/Layout';
import WebsiteLayout from './ui/website/WebsiteLayout';
import FaqScreen from './ui/website/faq/FaqScreen';
import LandingScreenContainer from './behavior/website/landing/LandingScreenContainer';
import AppLayout from './ui/app/AppLayout';
import SignUpScreenContainer from './behavior/app/auth/SignUpScreenContainer';
import SignUpSuccessScreen from './ui/app/auth/SignUpSuccessScreen';
import SignUpConfirmationScreenContainer from './behavior/app/auth/SignUpConfirmationScreenContainer';
import SignInScreenContainer from './behavior/app/auth/SignInScreenContainer';
import SignOutScreenContainer from './behavior/app/auth/SignOutScreenContainer';
import StopwatchScreenContainer from './behavior/app/stopwatches/StopwatchScreenContainer';
import ProjectListScreenContainer from './behavior/app/projects/ProjectListScreenContainer';
import ProjectFormScreenContainer from './behavior/app/projects/ProjectFormScreenContainer';
import TimeLogListScreenContainerWithPagination from './behavior/app/time-logs/TimeLogListScreenContainerWithPagination';
import TimeLogFormScreenContainer from './behavior/app/time-logs/TimeLogFormScreenContainer';
import { generateQueryForRelationship } from './behavior/app/utils/QueryUtils';

const AuthenticatedAppContainer = withRouter(
  UserIsAuthenticatedRedir(props => React.cloneElement(props.children, props)),
);

const NotAuthenticatedAppContainer = withRouter(
  UserIsNotAuthenticatedRedir(props => React.cloneElement(props.children, props)),
);

const ProjectListScreenContainerWithQuery = props => (
  <ProjectListScreenContainer getQuery={generateQueryForRelationship('author')} {...props} />
);

const TimeLogListScreenContainer = TimeLogListScreenContainerWithPagination(3);

const ProjectFormScreenContainerWithQuery = props => (
  <ProjectFormScreenContainer getQuery={generateQueryForRelationship('author')} {...props} />
);

const StopwatchScreenContainerWithQuery = props => (
  <StopwatchScreenContainer getQuery={generateQueryForRelationship('project')} {...props} />
);

export default () => (
  <UserProvider>
    <Layout>
      <Switch>
        <Route exact path="/sign-out" component={SignOutScreenContainer} />
        <Route
          path="/account"
          render={() => (
            <AppLayout>
              <NotAuthenticatedAppContainer>
                <Switch>
                  <Route exact path="/account/sign-in" component={SignInScreenContainer} />
                  <Route exact path="/account/sign-up" component={SignUpScreenContainer} />
                  <Route exact path="/account/sign-up/success" component={SignUpSuccessScreen} />
                  <Route exact path="/account/sign-up/confirmation" component={SignUpConfirmationScreenContainer} />
                </Switch>
              </NotAuthenticatedAppContainer>
            </AppLayout>
          )}
        />
        <Route
          path="/app"
          render={() => (
            <AppLayout>
              <AuthenticatedAppContainer>
                <Switch>
                  <Route exact path="/app" component={StopwatchScreenContainerWithQuery} />
                  <Route exact path="/app/projects" component={ProjectListScreenContainerWithQuery} />
                  <Route exact path="/app/projects/new" component={ProjectFormScreenContainer} />
                  <Route exact path="/app/projects/:projectId" component={ProjectFormScreenContainerWithQuery} />
                  <Route exact path="/app/time-logs" component={TimeLogListScreenContainer} />
                  <Route exact path="/app/time-logs/new" component={TimeLogFormScreenContainer} />
                  <Route exact path="/app/time-logs/:timeLogId" component={TimeLogFormScreenContainer} />
                </Switch>
              </AuthenticatedAppContainer>
            </AppLayout>
          )}
        />
        <Route
          path="/"
          render={() => (
            <WebsiteLayout>
              <Switch>
                <Route exact path="/" component={LandingScreenContainer} />
                <Route exact path="/faq" component={FaqScreen} />
              </Switch>
            </WebsiteLayout>
          )}
        />
      </Switch>
    </Layout>
  </UserProvider>
);
