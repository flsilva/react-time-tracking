import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';

const MainNav = (props) => {
  const navigateToDashboard = () => {
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

  const signedInMenu = () => (
    <List>
      <ListItem primaryText="Dashboard" onClick={navigateToDashboard} />
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

  const menu = (props.user) ? signedInMenu() : signedOutMenu();

  return menu;
};

MainNav.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

MainNav.defaultProps = {
  user: null,
};

export default MainNav;
