import React from 'react'
import AppHeader from '../header/AppHeader'
import EmailSignInForm from './EmailSignInForm'
import ErrorMessages from '../error/ErrorMessages'

const LoginSection = (props) => (
  <div className="LoginSection">
    <AppHeader title="Sign In" user={props.user} />
    <EmailSignInForm
      heading="Sign In"
      submitHandler={props.submitHandler}
      isFetching={props.isFetching}
      email={props.email}
    />
    <ErrorMessages error={props.error} />
  </div>
)

LoginSection.propTypes = {
  user: React.PropTypes.object
}

export default LoginSection
