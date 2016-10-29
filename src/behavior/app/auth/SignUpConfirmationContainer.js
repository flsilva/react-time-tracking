import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import SignUpConfirmationSection from '../../../ui/app/auth/SignUpConfirmationSection'

class SignUpConfirmationContainer extends Component {
  constructor(props) {
    super(props)
    const email = this.props.location.query.uid
    let success = this.props.location.query.account_confirmation_success
    success = (success === 'true') ? true : false
    this.state = {email: email, success: success, seconds: 15}
  }

  componentDidMount = () => {
    this.interval = setInterval(this.doCountdown, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  doCountdown = () => {
    this.setState({seconds: this.state.seconds - 1});
    if (this.state.seconds === 0) {
      const path = {
        pathname: '/login',
        query: {
          email: this.state.email
        }
      }

      browserHistory.push(path)
    }
  }

  render() {
    return <SignUpConfirmationSection success={this.state.success} seconds={this.state.seconds} />
  }
}

export default SignUpConfirmationContainer
