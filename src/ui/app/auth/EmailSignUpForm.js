import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmailSignUpForm extends Component {

  submitHandler = (e) => {
    e.preventDefault();

    const email = this.emailComponent.value;
    const password = this.passwordComponent.value;
    const confirmPassword = this.confirmPasswordComponent.value;

    this.props.submitHandler(email, password, confirmPassword);
  }

  render() {
    const submitButtonAttrs = {};
    if (this.props.isFetching) {
      submitButtonAttrs.disabled = 'disabled';
    }

    return (
      <form className="EmailSignUpForm" onSubmit={this.submitHandler}>
        <h3>
          {this.props.heading}
        </h3>
        <input
          ref={(c) => { this.emailComponent = c; }}
          type="text"
          placeholder="email"
        />
        <input
          ref={(c) => { this.passwordComponent = c; }}
          type="password"
          placeholder="password"
        />
        <input
          ref={(c) => { this.confirmPasswordComponent = c; }}
          type="password"
          placeholder="confirm password"
        />
        <button type="submit" {...submitButtonAttrs}>Send</button>
        { this.props.isFetching ? <p>Connecting, please wait...</p> : null }
      </form>
    );
  }
}

EmailSignUpForm.propTypes = {
  heading: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

EmailSignUpForm.defaultProps = {
  isFetching: false,
};

export default EmailSignUpForm;
