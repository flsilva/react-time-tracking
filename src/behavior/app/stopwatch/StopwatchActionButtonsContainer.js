import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActivityDescription } from '../stopwatch/StopwatchActions';
import StopwatchActionButtons from '../../../ui/app/stopwatch/StopwatchActionButtons';

const StopwatchActionButtonsContainer = (props) => {
  const onSaveClick = () => {
    console.log('StopwatchActionButtonsContainer().onSaveClick()');
  };

  return (
    <StopwatchActionButtons
      isConnecting={props.isConnecting}
      onSaveClick={onSaveClick}
    />
  );
};

StopwatchActionButtonsContainer.propTypes = {
  actions: PropTypes.shape({
    setActivityDescription: PropTypes.func.isRequired,
  }).isRequired,

  isConnecting: PropTypes.bool,
};

StopwatchActionButtonsContainer.defaultProps = {
  isConnecting: false,
};

const mapStateToProps = state => ({
  isConnecting: state.stopwatches.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({ setActivityDescription }, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchActionButtonsContainer);
