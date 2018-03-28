import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import SignUpConfirmationScreen from '../../presentation/auth/SignUpConfirmationScreen';

class SignUpConfirmationScreenContainer extends Component {
  state = { email: undefined, success: false, seconds: 15 };

  componentWillMount() {
    const query = parse(this.props.location.search);
    const email = query.uid;
    const success = query.account_confirmation_success === 'true';

    this.setState({ email, success });
  }

  componentDidMount() {
    if (this.state.success) this.interval = setInterval(this.doCountdown, 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  doCountdown = () => {
    this.setState({ seconds: this.state.seconds - 1 });

    if (this.state.seconds === 0) {
      this.context.router.history.push({
        pathname: '/account/sign-in',
        state: {
          email: this.state.email,
        },
      });
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

SignUpConfirmationScreenContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

SignUpConfirmationScreenContainer.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default SignUpConfirmationScreenContainer;
