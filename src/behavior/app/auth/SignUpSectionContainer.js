import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as EmailSignUpActions from './email/EmailSignUpActions';
import SignUpSection from '../../../ui/app/auth/SignUpSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class SignUpSectionContainer extends Component {
  submitHandler = (email, password, confirmPassword) => {
    this.props.actions.emailSignUp(email, password, confirmPassword)
      .then(this.submitHandlerSuccess);
  }

  submitHandlerSuccess = () => {
    browserHistory.push('/sign-up/success');
  }

  render() {
    const { isConnecting, error } = this.props.auth.emailSignUp;

    return (
      <div>
        <SignUpSection
          isConnecting={isConnecting}
          submitHandler={this.submitHandler}
          user={this.props.auth.user}
        />
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

SignUpSectionContainer.propTypes = {
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
)(SignUpSectionContainer);
