import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as EmailSignUpActions from './email/EmailSignUpActions'
import SignUpSection from '../../../ui/app/auth/SignUpSection'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EmailSignUpActions, dispatch)
})

class SignUpSectionContainer extends Component {
  submitHandler = (email, password, confirmPassword) => {
    this.props.actions.emailSignUp(email, password, confirmPassword)
      .then(this.submitHandlerSuccess)
  }

  submitHandlerSuccess = () => {
    console.log('SignUpSectionContainer().submitHandlerSuccess()')
    browserHistory.push('/sign-up/success')
  }

  render() {
    return (
      <SignUpSection
        error={this.props.auth.emailSignUp.error}
        isFetching={this.props.auth.emailSignUp.isFetching}
        submitHandler={this.submitHandler}
        user={this.props.auth.user}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpSectionContainer)
