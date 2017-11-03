import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AlignRight from '../../common/AlignRight';

const StopwatchFormButtons = props => (
  <AlignRight style={{ marginTop: 20 }}>
    <RaisedButton
      disabled={props.isConnecting}
      label="Save"
      primary
      onClick={props.onSaveClick}
    />
  </AlignRight>
);

StopwatchFormButtons.propTypes = {
  isConnecting: PropTypes.bool,
  onSaveClick: PropTypes.func.isRequired,
};

StopwatchFormButtons.defaultProps = {
  isConnecting: false,
};

export default StopwatchFormButtons;
