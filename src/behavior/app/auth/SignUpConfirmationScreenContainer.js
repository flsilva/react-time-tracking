import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import SignUpConfirmationScreen from '../../../ui/app/auth/SignUpConfirmationScreen';

class SignUpConfirmationScreenContainer extends Component {
  constructor(props) {
    super(props);

    const query = parse(this.props.location.search);
    const email = query.uid;
    let success = query.account_confirmation_success;
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
        pathname: '/account/sign-in',
        query: {
          email: this.state.email,
        },
      };

      this.props.history.push(path);
    }
  }

  render() {
    return (
      <SignUpConfirmationScreen
        success={this.state.success}
        seconds={this.state.seconds}
      />
    );
  }
}

SignUpConfirmationScreenContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default SignUpConfirmationScreenContainer;
