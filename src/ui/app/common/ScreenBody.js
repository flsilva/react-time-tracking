import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

const ScreenBody = props => (
  <div style={{ margin: 10, ...props.style }}>
    {props.children}
  </div>
);

ScreenBody.propTypes = {
  children: PropTypes.node.isRequired,
  style: stylePropType,
};

ScreenBody.defaultProps = {
  style: null,
};

export default ScreenBody;
