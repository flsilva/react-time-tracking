import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

const AlignRight = props => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', ...props.style }}>
    {props.children}
  </div>
);

AlignRight.propTypes = {
  children: PropTypes.node,
  style: stylePropType,
};

AlignRight.defaultProps = {
  children: null,
  style: null,
};

export default AlignRight;
