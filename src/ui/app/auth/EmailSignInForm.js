import React, { Component, PropTypes } from 'react'

class EmailSignInForm extends Component {

  static propTypes = {
    heading: PropTypes.string.isRequired,
    email: PropTypes.string
  }

  state = {
    email: this.props.email || ''
  }

  emailChangeHandler = e => {
    this.setState({ email: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.submitHandler(this.state.email, this.refs.password.value)
  }

  render() {
    const submitButtonAttrs = {}
    if (this.props.isFetching) {
      submitButtonAttrs.disabled = 'disabled'
    }

    return (
      <form className="EmailSignInForm" onSubmit={this.submitHandler}>
        <h3>
          {this.props.heading}
        </h3>
        <input
          type="text"
          placeholder="email"
          autoFocus="true"
          value={this.state.email}
          onChange={this.emailChangeHandler}
        />
        <input
          ref="password"
          type="password"
          placeholder="password"
        />
        <button type="submit" {...submitButtonAttrs}>Send</button>
        { this.props.isFetching ? <p>Connecting, please wait...</p> : null }
      </form>
    )
  }
}

export default EmailSignInForm
