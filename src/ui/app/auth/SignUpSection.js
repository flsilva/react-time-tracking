import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../header/AppHeader';
import EmailSignUpForm from './EmailSignUpForm';
import Notifications from '../utils/Notifications';

const SignUpSection = props => (
  <div className="SignUpSection">
    <AppHeader title="Sign Up" user={props.user} />
    <EmailSignUpForm
      heading="Sign Up"
      submitHandler={props.submitHandler}
      isFetching={props.isFetching}
    />
    <Notifications notifications={props.error} />
  </div>
);

SignUpSection.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isFetching: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

SignUpSection.defaultProps = {
  error: null,
  isFetching: false,
  user: null,
};

export default SignUpSection;
