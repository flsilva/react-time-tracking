import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

const styles = {
  bottom: '20px',
  position: 'fixed',
  right: '20px',
};

const AddFAB = ({ onClick, style }) => (
  <FloatingActionButton
    onClick={onClick}
    style={{ ...styles, ...style }}
  >
    <ContentAddIcon />
  </FloatingActionButton>
);

AddFAB.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: stylePropType,
};

AddFAB.defaultProps = {
  style: undefined,
};

export default AddFAB;
