import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class EmailSignUpForm extends Component {

  state = {
    email: this.props.email || '',
    password: '',
    confirmPassword: '',
  }

  emailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  }

  passwordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  }

  confirmPasswordChangeHandler = (e) => {
    this.setState({ confirmPassword: e.target.value });
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = this.state;
    this.props.submitHandler(email, password, confirmPassword);
  }

  render() {
    const submitButtonAttrs = {};
    if (this.props.isFetching) {
      submitButtonAttrs.disabled = 'disabled';
    }

    return (
      <form className="EmailSignUpForm">
        <TextField
          hintText="email"
          onChange={this.emailChangeHandler}
          type="email"
          value={this.state.email}
        />
        <TextField
          hintText="password"
          onChange={this.passwordChangeHandler}
          type="password"
          value={this.state.password}
        />
        <TextField
          hintText="type password again"
          onChange={this.confirmPasswordChangeHandler}
          type="password"
          value={this.state.confirmPassword}
        />
        <RaisedButton
          primary
          fullWidth
          disabled={this.props.isFetching}
          style={{ marginTop: 20 }}
          label="Sign Up"
          onClick={this.submitHandler}
        />
      </form>
    );
  }
}

EmailSignUpForm.propTypes = {
  email: PropTypes.string,
  isFetching: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

EmailSignUpForm.defaultProps = {
  email: '',
  isFetching: false,
};

export default EmailSignUpForm;
