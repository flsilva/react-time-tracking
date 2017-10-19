import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActivityDescription } from './StopwatchActions';
import StopwatchFormButtons from '../../../ui/app/stopwatch/StopwatchFormButtons';

const StopwatchFormButtonsContainer = (props) => {
  const onSaveClick = () => {
    console.log('StopwatchFormButtonsContainer().onSaveClick()');
  };

  return (
    <StopwatchFormButtons
      isConnecting={props.isConnecting}
      onSaveClick={onSaveClick}
    />
  );
};

StopwatchFormButtonsContainer.propTypes = {
  actions: PropTypes.shape({
    setActivityDescription: PropTypes.func.isRequired,
  }).isRequired,

  isConnecting: PropTypes.bool,
};

StopwatchFormButtonsContainer.defaultProps = {
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
)(StopwatchFormButtonsContainer);
