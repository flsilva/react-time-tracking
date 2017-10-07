import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AlignRight from '../../common/AlignRight';

const StopwatchActionButtons = props => (
  <AlignRight style={{ marginTop: 20 }}>
    <RaisedButton
      disabled={props.isConnecting}
      label="Save"
      primary
      onClick={props.onSaveClick}
    />
  </AlignRight>
);

StopwatchActionButtons.propTypes = {
  isConnecting: PropTypes.bool,
  onSaveClick: PropTypes.func.isRequired,
};

StopwatchActionButtons.defaultProps = {
  isConnecting: false,
};

export default StopwatchActionButtons;
