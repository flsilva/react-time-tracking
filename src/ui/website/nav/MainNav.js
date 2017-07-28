import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Navigation from 'react-toolbox/lib/navigation';
import './MainNav.css';

const MainNav = (props) => {
  const navigateToSignUp = () => {
    browserHistory.push('/sign-up');
  };

  const navigateToSignIn = () => {
    browserHistory.push('/sign-in');
  };

  const signedInLinks = () => (
    [
      { label: 'Back to App', flat: true, icon: 'keyboard_arrow_left', href: '/app' },
    ]
  );

  const signedOutLinks = () => (
    [
      { label: 'Sign Up', flat: true, onMouseUp: navigateToSignUp },
      { label: 'Sign In', flat: true, onMouseUp: navigateToSignIn },
    ]
  );

  const links = (props.user) ? signedInLinks() : signedOutLinks();

  return (
    <Navigation type="vertical" actions={links} />
  );
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
