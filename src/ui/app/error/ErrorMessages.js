import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessages = (props) => {
  let errors = props.error;
  if (typeof errors === 'string') {
    errors = [errors];
  }

  const renderItem = (message, index) => (
    <p key={index}>
      {message}
    </p>
  );

  return (
    <div className="ErrorMessages">
      {errors instanceof Array ? errors.map(renderItem) : null}
    </div>
  );
};

ErrorMessages.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};

ErrorMessages.defaultProps = {
  error: null,
};

export default ErrorMessages;
