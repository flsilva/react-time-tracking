import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../header/AppHeader';
import EmailSignInForm from './EmailSignInForm';
import Notifications from '../utils/Notifications';

const bodyStyles = {
  margin: '20px',
};

const LoginSection = (props) => {
  // const errorMessage = (props && props.error) ? props.error : '';

  const getNotifications = () => {
    if (!props) return null;

    if (props.isFetching) {
      return ['Connecting, please wait...'];
    } else if (props && props.error) {
      return props.error;
    }

    return null;
  };

  return (
    <div className="LoginSection">
      <AppHeader title="Sign In" user={props.user} />
      <div style={bodyStyles}>
        <EmailSignInForm
          submitHandler={props.submitHandler}
          isFetching={props.isFetching}
          email={props.email}
        />
      </div>
      <Notifications notifications={getNotifications()} />
    </div>
  );
};

LoginSection.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  email: PropTypes.string,
  isFetching: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

LoginSection.defaultProps = {
  email: '',
  isFetching: false,
  error: null,
  user: null,
};

export default LoginSection;
