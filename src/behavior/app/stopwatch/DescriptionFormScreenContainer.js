import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setActivityDescription } from '../stopwatch/StopwatchActions';
import { getStopwatch } from '../stopwatch/StopwatchState';
import DescriptionFormScreen from '../../../ui/app/stopwatch/DescriptionFormScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

const DescriptionFormScreenContainer = (props) => {
  const { error, isConnecting } = props;

  const submitHandler = (newDescription) => {
    const { id } = props;
    props.actions.setActivityDescription({ id, description: newDescription });
    browserHistory.push('/app');
  };

  return (
    <div>
      <DescriptionFormScreen
        goBackHandler={() => browserHistory.push('/app')}
        description={props.description}
        submitHandler={submitHandler}
        isConnecting={isConnecting}
      />
      <Notifications notifications={getNotifications(error, isConnecting)} />
    </div>
  );
};

DescriptionFormScreenContainer.propTypes = {
  actions: PropTypes.shape({
    setActivityDescription: PropTypes.func.isRequired,
  }).isRequired,

  error: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  isConnecting: PropTypes.bool,
  description: PropTypes.string,
};

DescriptionFormScreenContainer.defaultProps = {
  error: null,
  id: '',
  description: '',
  isConnecting: false,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const description = stopwatch.description ? stopwatch.description : '';

  return {
    error: state.stopwatches.error,
    id: stopwatch.id,
    description,
    isConnecting: state.stopwatches.isConnecting,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({ setActivityDescription }, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DescriptionFormScreenContainer);
