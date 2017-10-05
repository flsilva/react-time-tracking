import React from 'react';
import PropTypes from 'prop-types';

const IconFieldWrap = props => (
  <div style={{ alignItems: 'center', display: 'flex', height: 48 }}>
    <div style={{ alignItems: 'center', display: 'flex', marginRight: 20 }}>
      {props.icon}
    </div>
    {props.children}
  </div>
);

IconFieldWrap.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.element.isRequired,
};

IconFieldWrap.defaultProps = {
  children: null,
};

export default IconFieldWrap;
