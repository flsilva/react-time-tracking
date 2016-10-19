import React from 'react'

const SignUpConfirmationSection = (props) => {
  let heading
  let body

  if (props.success) {
    heading = 'Thank you for completing your registration.'
    body = `You\'ll be redirected to sign in in ${props.seconds} seconds.`
  } else {
    heading = 'Oops!'
    body = 'There was an error trying to confirm you registration.' +
           ' Please contact us at support@apiapp.com to fix this problem.'
  }

  return (
    <div className="SignUpConfirmationSection">
      <h2>
        {heading}
      </h2>
      <p>
        {body}
      </p>
    </div>
  )
}

SignUpConfirmationSection.propTypes = {
  seconds: React.PropTypes.number.isRequired
}

export default SignUpConfirmationSection
