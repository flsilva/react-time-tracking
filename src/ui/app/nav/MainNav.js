import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';

const MainNav = (props, context) => {
  const navigateToStopwatch = () => {
    browserHistory.push('/app');
  };

  const navigateToSignUp = () => {
    browserHistory.push('/sign-up');
  };

  const navigateToSignIn = () => {
    browserHistory.push('/sign-in');
  };

  const navigateToSignOut = () => {
    browserHistory.push('/sign-out');
  };

  const navigateToProjects = () => {
    browserHistory.push('/app/projects');
  };

  const navigateToTimeLogs = () => {
    browserHistory.push('/app/time-logs');
  };

  const signedInMenu = () => (
    <List>
      <ListItem primaryText="Stopwatch" onClick={navigateToStopwatch} />
      <ListItem primaryText="Time Logs" onClick={navigateToTimeLogs} />
      <ListItem primaryText="Projects" onClick={navigateToProjects} />
      <ListItem primaryText="Sign Out" onClick={navigateToSignOut} />
    </List>
  );

  const signedOutMenu = () => (
    <List>
      <ListItem primaryText="Sign Up" onClick={navigateToSignUp} />
      <ListItem primaryText="Sign In" onClick={navigateToSignIn} />
    </List>
  );

  const menu = (context.user) ? signedInMenu() : signedOutMenu();

  return menu;
};

MainNav.contextTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default MainNav;
