import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as EmailSignUpActions from './email/EmailSignUpActions';
import SignUpScreen from '../../../ui/app/auth/SignUpScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class SignUpScreenContainer extends Component {
  submitHandler = (data) => {
    this.props.actions.emailSignUp(data, this.submitHandlerSuccess);
  }

  submitHandlerSuccess = () => {
    browserHistory.push('/sign-up/success');
  }

  render() {
    const { isConnecting, error } = this.props.auth.emailSignUp;

    return (
      <div>
        <SignUpScreen
          isConnecting={isConnecting}
          submitHandler={this.submitHandler}
          user={this.props.auth.user}
        />
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

SignUpScreenContainer.propTypes = {
  actions: PropTypes.shape({
    emailSignUp: PropTypes.func.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    emailSignUp: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
      isConnecting: PropTypes.bool,
    }).isRequired,
    user: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EmailSignUpActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreenContainer);
