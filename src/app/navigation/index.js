import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import UserProvider from '../../shared/application/UserProvider';
import {
  UserIsAuthenticatedRedir,
  UserIsNotAuthenticatedRedir,
} from '../application/auth/UserAuthWrappers';
import Layout from '../../shared/presentation/Layout';
import WebsiteLayout from '../../website/presentation/WebsiteLayout';
import FaqScreen from '../../website/presentation/faq/FaqScreen';
import LandingScreenContainer from '../../website/application/landing/LandingScreenContainer';
import AppLayout from '../presentation/AppLayout';
import SignUpScreenContainer from '../application/auth/SignUpScreenContainer';
import SignUpSuccessScreen from '../presentation/auth/SignUpSuccessScreen';
import SignUpConfirmationScreenContainer from '../application/auth/SignUpConfirmationScreenContainer';
import SignInScreenContainer from '../application/auth/SignInScreenContainer';
import SignOutScreenContainer from '../application/auth/SignOutScreenContainer';
import TimeLogListScreenContainerWithQuery from '../application/time-logs/TimeLogListScreenContainerWithQuery';
import TimeLogFormScreenContainer from '../application/time-logs/TimeLogFormScreenContainer';
import { EditProjectRoute, NewProjectRoute, ProjectListRoute } from './ProjectRoutes';
import { StopwatchRoute } from './StopwatchesRoutes';

export default () => {
  const AuthenticatedAppContainer = withRouter(
    UserIsAuthenticatedRedir(props => React.cloneElement(props.children, props)),
  );

  AuthenticatedAppContainer.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const NotAuthenticatedAppContainer = withRouter(
    UserIsNotAuthenticatedRedir(props => React.cloneElement(props.children, props)),
  );

  NotAuthenticatedAppContainer.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const TimeLogListScreenContainer = TimeLogListScreenContainerWithQuery(3);

  return (
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
                    <Route exact path="/app" component={StopwatchRoute} />
                    <Route exact path="/app/projects" component={ProjectListRoute(999)} />
                    <Route exact path="/app/projects/new" component={NewProjectRoute} />
                    <Route exact path="/app/projects/:projectId" component={EditProjectRoute} />
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
};
