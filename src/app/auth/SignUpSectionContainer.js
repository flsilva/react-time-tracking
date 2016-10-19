import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as AuthActions from './Auth.Actions'
import SignUpSection from '../../components/auth/SignUpSection'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

class SignUpSectionContainer extends Component {
  submitHandler = (email, password, confirmPassword) => {
    this.props.actions.emailSignUp(email, password, confirmPassword)
      .then(this.submitHandlerSuccess)
      .catch(this.submitHandlerError)
  }

  submitHandlerSuccess = () => {
    console.log('SignUpSectionContainer().submitHandlerSuccess()')
    browserHistory.push('/sign-up/success')
  }

  submitHandlerError = () => {
    console.log('SignUpSectionContainer().submitHandlerError()')
    // do nothing, reducer will update state.
  }

  render() {
    return (
      <SignUpSection
        submitHandler={this.submitHandler}
        isFetching={this.props.auth.isFetching}
        error={this.props.auth.error}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpSectionContainer)

