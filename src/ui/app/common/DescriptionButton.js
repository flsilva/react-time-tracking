import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  button: {
    borderBottom: '1px solid rgb(179, 179, 179)',
    borderRadius: 0,
    display: 'flex',
    flexGrow: 1,
    textAlign: 'left',
  },
  label: {
    color: 'rgb(179, 179, 179)',
    fontSize: 16,
    fontWeight: 300,
    padding: 0,
    textTransform: 'none',
  },
};

const DescriptionButton = ({ description, onClick }) => {
  let label = description || 'Description (optional)';
  if (label.length > 36) {
    label = `${label.substr(0, 36)}...`;
  }

  return (
    <FlatButton
      label={label}
      onClick={onClick}
      style={styles.button}
      labelStyle={styles.label}
    />
  );
};

DescriptionButton.propTypes = {
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

DescriptionButton.defaultProps = {
  description: '',
};

export default DescriptionButton;
