import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EmailSignUpActions from './email/EmailSignUpActions';
import SignUpScreen from '../../presentation/auth/SignUpScreen';
import Notifications from '../../presentation/utils/Notifications';
import { getNotifications } from '../utils';

const SignUpScreenContainer = ({ actions, history, isConnecting, error }) => {
  const submitHandlerSuccess = () => {
    history.push('/account/sign-up/success');
  };

  const submitHandler = (data) => {
    actions.emailSignUp(data, submitHandlerSuccess);
  };

  return (
    <div>
      <SignUpScreen
        isConnecting={isConnecting}
        submitHandler={submitHandler}
      />
      <Notifications notifications={getNotifications(error, isConnecting)} />
    </div>
  );
};

SignUpScreenContainer.propTypes = {
  actions: PropTypes.shape({
    emailSignUp: PropTypes.func.isRequired,
  }).isRequired,

  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  isConnecting: PropTypes.bool,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

SignUpScreenContainer.defaultProps = {
  error: undefined,
  isConnecting: false,
};

const mapStateToProps = state => ({
  error: state.auth.emailSignUp.error,
  isConnecting: state.auth.emailSignUp.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EmailSignUpActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreenContainer);
