import React from 'react'
import EmailSignUpForm from '../../components/auth/EmailSignUpForm'
import ErrorMessages from '../error/ErrorMessages'

const SignUpSection = (props) => (
  <div className="SignUpSection">
    <EmailSignUpForm
      heading="Sign Up"
      submitHandler={props.submitHandler}
      isFetching={props.isFetching}
    />
    <ErrorMessages error={props.error} />
  </div>
)

export default SignUpSection
