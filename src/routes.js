import React from 'react';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './behavior/app/auth/UserAuthWrappers';
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

// const AuthenticatedAppContainer = UserIsAuthenticated((props) => props.children);
const AuthenticatedAppContainer = UserIsAuthenticated(props =>
  React.cloneElement(props.children, { user: props.authData.user }),
);
const NotAuthenticatedAppContainer = UserIsNotAuthenticated(props => props.children);

const ProjectListScreenContainer = ProjectListScreenContainerWithPagination(3);
const TimeLogListScreenContainer = TimeLogListScreenContainerWithPagination(3);

const ProjectFormScreenContainerWithQuery = props => (
  <ProjectFormScreenContainer getQuery={getRelationshipQuery('author')} {...props} />
);

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
