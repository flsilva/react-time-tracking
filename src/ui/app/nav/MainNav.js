import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

const MainNav = (props, { router, user }) => {
  const navigateToStopwatch = () => {
    router.history.push('/app');
  };

  const navigateToSignUp = () => {
    router.history.push('/account/sign-up');
  };

  const navigateToSignIn = () => {
    router.history.push('/account/sign-in');
  };

  const navigateToSignOut = () => {
    router.history.push('/sign-out');
  };

  const navigateToProjects = () => {
    router.history.push('/app/projects');
  };

  const navigateToTimeLogs = () => {
    router.history.push('/app/time-logs');
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

  const menu = (user) ? signedInMenu() : signedOutMenu();

  return menu;
};

MainNav.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default MainNav;
