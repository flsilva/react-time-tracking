import React, { Component, PropTypes } from 'react'

class EmailSignUpForm extends Component {

  static propTypes = {
    heading: PropTypes.string.isRequired
  }

  submitHandler = e => {
    e.preventDefault()

    const email = this.refs.email.value
    const password = this.refs.password.value
    const confirmPassword = this.refs.confirmPassword.value

    this.props.submitHandler(email, password, confirmPassword)
  }

  render() {
    const submitButtonAttrs = {}
    if (this.props.isFetching) {
      submitButtonAttrs.disabled = 'disabled'
    }

    return (
      <form className="EmailSignUpForm" onSubmit={this.submitHandler}>
        <h3>
          {this.props.heading}
        </h3>
        <input
          ref="email"
          type="text"
          placeholder="email"
          autoFocus="true"
        />
        <input
          ref="password"
          type="password"
          placeholder="password"
        />
        <input
          ref="confirmPassword"
          type="password"
          placeholder="confirm password"
        />
        <button type="submit" {...submitButtonAttrs}>Send</button>
        { this.props.isFetching ? <p>Connecting, please wait...</p> : null }
      </form>
    )
  }
}

export default EmailSignUpForm
