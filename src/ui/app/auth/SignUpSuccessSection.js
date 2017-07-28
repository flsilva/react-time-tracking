import React from 'react';

const SignUpSuccessSection = () => {
  const copy = 'Yay!\n\n' +
      "You're almost there.\n" +
      "We've received your data and sent you a confirmation email. " +
      'Please follow instructions in that email to confirm your registration.';

  return (
    <div className="SignUpSuccessSection">
      <p>
        { copy }
      </p>
    </div>
  );
};

export default SignUpSuccessSection;
