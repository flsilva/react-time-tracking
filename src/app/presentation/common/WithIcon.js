import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

const WithIcon = ({ children, icon, iconStyle, style }) => (
  <div style={{ alignItems: 'center', display: 'flex', height: 48, ...style }}>
    <div style={{ alignItems: 'center', display: 'flex', marginRight: 20, ...iconStyle }}>
      {icon}
    </div>
    {children}
  </div>
);

WithIcon.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.element.isRequired,
  iconStyle: stylePropType,
  style: stylePropType,
};

WithIcon.defaultProps = {
  iconStyle: undefined,
  style: undefined,
};

export default WithIcon;
