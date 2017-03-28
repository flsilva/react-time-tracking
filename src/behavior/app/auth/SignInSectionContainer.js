import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as EmailSignInActions from './email/EmailSignInActions'
import LoginSection from '../../../ui/app/auth/LoginSection'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EmailSignInActions, dispatch)
})

const LoginSectionContainer = (props) => (
  <LoginSection
    email={props.location.query.email}
    error={props.auth.emailSignIn.error}
    isFetching={props.auth.emailSignIn.isFetching}
    submitHandler={props.actions.emailSignIn}
    user={props.auth.user}
  />
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSectionContainer)

