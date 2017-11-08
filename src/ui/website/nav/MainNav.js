import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

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
        leftIcon={<ArrowBackIcon />}
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
    email: PropTypes.string,
  }),
};

export default MainNav;
