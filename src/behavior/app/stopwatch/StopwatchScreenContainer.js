import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getStopwatch } from './StopwatchReducers';
import * as StopwatchActions from './StopwatchActions';
import { readEntities as readProjectEntities, QUERY_ALL } from '../projects/ProjectActions';
import { readEntitiesByQueries } from '../projects/ProjectReducers';
import StopwatchScreen from '../../../ui/app/stopwatch/StopwatchScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class StopwatchScreenContainer extends Component {

  componentDidMount() {
    this.props.actions.readStopwatch();
    this.props.actions.readProjectEntities(QUERY_ALL);
  }

  submit = () => {
    console.log('StopwatchScreenContainer().submit()');
  }

  render() {
    const { error, isConnecting, data } = this.props;

    return (
      <div>
        <StopwatchScreen
          datePicked={this.props.actions.setActivityDate}
          descriptionClickHandler={() => browserHistory.push('/app/log-description')}
          hourPicked={this.props.actions.setStopwatchHours}
          minutePicked={this.props.actions.setStopwatchMinutes}
          projectPicked={this.props.actions.setActivityProject}
          data={data}
          projects={this.props.projects}
          pauseStopwatch={this.props.actions.pauseStopwatch}
          resetStopwatch={this.props.actions.resetStopwatch}
          startStopwatch={this.props.actions.startStopwatch}
          submit={this.submit}
          error={this.props.error}
          isConnecting={isConnecting}
        />
        <Notifications notifications={getNotifications(error, false)} />
      </div>
    );
  }
}

StopwatchScreenContainer.propTypes = {
  actions: PropTypes.shape({
    readStopwatch: PropTypes.func.isRequired,
    readProjectEntities: PropTypes.func.isRequired,
    setActivityDate: PropTypes.func.isRequired,
    setStopwatchHours: PropTypes.func.isRequired,
    setStopwatchMinutes: PropTypes.func.isRequired,
    setActivityProject: PropTypes.func.isRequired,
    pauseStopwatch: PropTypes.func.isRequired,
    resetStopwatch: PropTypes.func.isRequired,
    startStopwatch: PropTypes.func.isRequired,
  }).isRequired,

  data: PropTypes.shape({
    activityDate: PropTypes.instanceOf(Date),
    isRunning: PropTypes.bool,
    startedAt: PropTypes.instanceOf(Date),
    activityTotalTime: PropTypes.number,
  }),
  error: PropTypes.arrayOf(PropTypes.string),
  isConnecting: PropTypes.bool,

  projects: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    isConnecting: PropTypes.bool,
  }),
};

StopwatchScreenContainer.defaultProps = {
  data: null,
  error: null,
  isConnecting: false,
  projects: {},
};

const mapStateToProps = state => ({
  data: getStopwatch(state),
  projects: {
    data: readEntitiesByQueries(state, [QUERY_ALL]),
    isConnecting: state.projects.isConnecting,
  },
  isConnecting: state.stopwatches.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({ readProjectEntities }, dispatch),
    ...bindActionCreators(StopwatchActions, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchScreenContainer);
