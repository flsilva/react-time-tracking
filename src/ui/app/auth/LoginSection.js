import React from 'react'
import EmailSignInForm from './EmailSignInForm'
import ErrorMessages from '../error/ErrorMessages'

const LoginSection = (props) => (
  <div className="LoginSection">
    <EmailSignInForm
      heading="Sign In"
      submitHandler={props.submitHandler}
      isFetching={props.isFetching}
      email={props.email}
    />
    <ErrorMessages error={props.error} />
  </div>
)

export default LoginSection
