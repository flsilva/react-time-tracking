import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EmailSignInActions from './email/EmailSignInActions';
import SignInScreen from '../../presentation/auth/SignInScreen';
import Notifications from '../../presentation/utils/Notifications';
import { getNotifications } from '../utils';

const SignInScreenContainer = ({ actions, isConnecting, error, location }) => {
  const email = location.state ? location.state.email : undefined;

  return (
    <div>
      <SignInScreen
        email={email}
        error={error}
        isConnecting={isConnecting}
        submitHandler={actions.emailSignIn}
      />
      <Notifications notifications={getNotifications(error, isConnecting)} />
    </div>
  );
};

SignInScreenContainer.propTypes = {
  actions: PropTypes.shape({
    emailSignIn: PropTypes.func.isRequired,
  }).isRequired,

  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  isConnecting: PropTypes.bool,

  location: PropTypes.shape({
    search: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
};

SignInScreenContainer.defaultProps = {
  error: undefined,
  isConnecting: false,
};

const mapStateToProps = state => ({
  error: state.auth.emailSignIn.error,
  isConnecting: state.auth.emailSignIn.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EmailSignInActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreenContainer);
