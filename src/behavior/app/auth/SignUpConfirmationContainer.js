import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SignUpConfirmationSection from '../../../ui/app/auth/SignUpConfirmationSection';

class SignUpConfirmationContainer extends Component {
  constructor(props) {
    super(props);

    const email = this.props.location.query.uid;
    let success = this.props.location.query.account_confirmation_success;
    success = success === 'true';

    this.state = { email, success, seconds: 15 };
  }

  componentDidMount = () => {
    this.interval = setInterval(this.doCountdown, 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  doCountdown = () => {
    this.setState({ seconds: this.state.seconds - 1 });

    if (this.state.seconds === 0) {
      const path = {
        pathname: '/sign-in',
        query: {
          email: this.state.email,
        },
      };

      browserHistory.push(path);
    }
  }

  render() {
    return (
      <SignUpConfirmationSection
        success={this.state.success}
        seconds={this.state.seconds}
      />
    );
  }
}

SignUpConfirmationContainer.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      uid: PropTypes.string,
      account_confirmation_success: PropTypes.string,
    }),
  }).isRequired,
};

export default SignUpConfirmationContainer;
