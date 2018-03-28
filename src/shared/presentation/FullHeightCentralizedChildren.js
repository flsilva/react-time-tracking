import React from 'react';
import PropTypes from 'prop-types';

const FullHeightCentralizedChildren = (props) => {
  const styles = {
    alignItems: 'center',
    display: 'flex',
    height: window.innerHeight,
    justifyContent: 'center',
  };

  return (
    <div style={styles}>
      {props.children}
    </div>
  );
};

FullHeightCentralizedChildren.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FullHeightCentralizedChildren;
