import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import './MainNav.css';

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

  const signedInMenu = () => (
    <List>
      <ListItem
        primaryText="Back to App"
        leftIcon="keyboard_arrow_left"
        onClick={navigateToStopwatch}
      />
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
    name: PropTypes.string,
  }),
};

export default MainNav;
