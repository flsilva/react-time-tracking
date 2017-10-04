import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setActivityDescription } from '../stopwatch/StopwatchActions';
import { getStopwatch } from '../stopwatch/StopwatchReducers';
import DescriptionScreen from '../../../ui/app/stopwatch/DescriptionScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

const DescriptionScreenContainer = (props) => {
  const { description, error, isConnecting } = props;

  const submitHandler = (data) => {
    props.actions.setActivityDescription(data);
    browserHistory.push('/app');
  };

  return (
    <div>
      <DescriptionScreen
        goBackHandler={() => browserHistory.push('/app')}
        description={description}
        initialValues={props.initialValues}
        submitHandler={submitHandler}
        isConnecting={isConnecting}
      />
      <Notifications notifications={getNotifications(error, isConnecting)} />
    </div>
  );
};

DescriptionScreenContainer.propTypes = {
  actions: PropTypes.shape({
    setActivityDescription: PropTypes.func.isRequired,
  }).isRequired,

  error: PropTypes.arrayOf(PropTypes.string),
  isConnecting: PropTypes.bool,
  initialValues: PropTypes.shape({
    description: PropTypes.string,
  }),
};

DescriptionScreenContainer.defaultProps = {
  initialValues: {},
  error: null,
  isConnecting: false,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state);
  const description = stopwatch && stopwatch.description ? stopwatch.description : '';

  return {
    error: state.stopwatches.error,
    initialValues: {
      description,
    },
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
)(DescriptionScreenContainer);
