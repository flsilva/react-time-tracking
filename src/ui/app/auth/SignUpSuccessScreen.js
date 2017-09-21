import React from 'react';

const SignUpSuccessScreen = () => {
  const copy = 'Yay!\n\n' +
      "You're almost there.\n" +
      "We've received your data and sent you a confirmation email. " +
      'Please follow instructions in that email to confirm your registration.';

  return (
    <div className="SignUpSuccessScreen">
      <p>
        { copy }
      </p>
    </div>
  );
};

export default SignUpSuccessScreen;
