import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from './Auth.Actions'
import LoginSection from '../../../ui/app/auth/LoginSection'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

const LoginSectionContainer = (props) => (
  <LoginSection
    submitHandler={props.actions.emailSignIn}
    isFetching={props.auth.isFetching}
    email={props.location.query.email}
    error={props.auth.error}
  />
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSectionContainer)

