import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmailSignInForm extends Component {

  state = {
    email: this.props.email || '',
  }

  emailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.submitHandler(this.state.email, this.passwordComponent.value);
  }

  render() {
    const submitButtonAttrs = {};
    if (this.props.isFetching) {
      submitButtonAttrs.disabled = 'disabled';
    }

    return (
      <form className="EmailSignInForm" onSubmit={this.submitHandler}>
        <h3>
          {this.props.heading}
        </h3>
        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.emailChangeHandler}
        />
        <input
          ref={(c) => { this.passwordComponent = c; }}
          type="password"
          placeholder="password"
        />
        <button type="submit" {...submitButtonAttrs}>Send</button>
        { this.props.isFetching ? <p>Connecting, please wait...</p> : null }
      </form>
    );
  }
}

EmailSignInForm.propTypes = {
  email: PropTypes.string,
  heading: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

EmailSignInForm.defaultProps = {
  email: '',
  isFetching: false,
};

export default EmailSignInForm;
