import React from 'react';
import PropTypes from 'prop-types';

export default params => (WrappedComponent) => {
  function withRouterParams(props) {
    const injectedParams = props.match.params || {};

    const paramsToData = Object
      .keys(params)
      .map(key => ({ name: key, to: params[key] }))
      .reduce((accumulator, param) => ({
        ...accumulator,
        ...{ [param.to]: injectedParams[param.name] },
      }), {});

    return <WrappedComponent {...paramsToData} {...props} />;
  }

  withRouterParams.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
  };

  return withRouterParams;
};
