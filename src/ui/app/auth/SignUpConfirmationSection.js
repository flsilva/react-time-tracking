import React from 'react';
import PropTypes from 'prop-types';

const SignUpConfirmationSection = (props) => {
  let heading;
  let body;

  if (props.success) {
    heading = 'Thank you for completing your registration.';
    body = `You'll be redirected to sign in in ${props.seconds} seconds.`;
  } else {
    heading = 'Oops!';
    body = 'There was an error trying to confirm you registration.' +
           ' Please contact us at support@apiapp.com to fix this problem.';
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
  );
};

SignUpConfirmationSection.propTypes = {
  seconds: PropTypes.number.isRequired,
  success: PropTypes.bool.isRequired,
};

export default SignUpConfirmationSection;
