import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import './MainNav.css';

const MainNav = (props) => {
  const navigateToTimer = () => {
    browserHistory.push('/app');
  };

  const navigateToSignUp = () => {
    browserHistory.push('/sign-up');
  };

  const navigateToSignIn = () => {
    browserHistory.push('/sign-in');
  };

  const signedInMenu = () => (
    <List>
      <ListItem
        primaryText="Back to App"
        leftIcon="keyboard_arrow_left"
        onClick={navigateToTimer}
      />
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
