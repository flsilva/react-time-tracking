import React from 'react'
import AppHeader from '../header/AppHeader'
import EmailSignUpForm from './EmailSignUpForm'
import ErrorMessages from '../error/ErrorMessages'

const SignUpSection = (props) => (
  <div className="SignUpSection">
    <AppHeader title="Sign Up" user={props.user} />
    <EmailSignUpForm
      heading="Sign Up"
      submitHandler={props.submitHandler}
      isFetching={props.isFetching}
    />
    <ErrorMessages error={props.error} />
  </div>
)

SignUpSection.propTypes = {
  user: React.PropTypes.object
}

export default SignUpSection
