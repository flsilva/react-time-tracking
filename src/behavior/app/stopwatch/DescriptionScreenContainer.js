import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setActivityDescription } from '../stopwatch/StopwatchActions';
import { getStopwatch } from '../stopwatch/StopwatchState';
import DescriptionScreen from '../../../ui/app/stopwatch/DescriptionScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

const DescriptionScreenContainer = (props) => {
  const { error, isConnecting } = props;

  const submitHandler = (newDescription) => {
    const { id } = props;
    props.actions.setActivityDescription({ id, description: newDescription });
    browserHistory.push('/app');
  };

  return (
    <div>
      <DescriptionScreen
        goBackHandler={() => browserHistory.push('/app')}
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
  id: PropTypes.string,
  isConnecting: PropTypes.bool,
  initialValues: PropTypes.shape({
    description: PropTypes.string,
  }),
};

DescriptionScreenContainer.defaultProps = {
  error: null,
  id: '',
  initialValues: {},
  isConnecting: false,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const description = stopwatch.description ? stopwatch.description : '';

  return {
    error: state.stopwatches.error,
    id: stopwatch.id,
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
