import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getStopwatch } from './TimerReducers';
import * as TimerActions from './TimerActions';
import { readEntities as readProjectEntities } from '../projects/ProjectActions';
import { readEntitiesByQueries } from '../projects/ProjectReducers';
import TimerScreen from '../../../ui/app/timer/TimerScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class TimerScreenContainer extends Component {

  componentDidMount() {
    this.props.actions.readStopwatch();

    // TODO: refactor: make query optional,
    // and make fetchedQueries work with empty queries.
    // think about a constant QUERY_ALL exposed by ProjectActions,
    // instead of empty / null.
    this.props.actions.readProjectEntities('?include=author');
    //
  }

  submit = () => {
    console.log('TimerScreenContainer().submit()');
  }

  render() {
    const { error, isConnecting, data } = this.props;

    return (
      <div>
        <TimerScreen
          datePicked={this.props.actions.setActivityDate}
          hourPicked={this.props.actions.setStopwatchHours}
          minutePicked={this.props.actions.setStopwatchMinutes}
          projectPicked={this.props.actions.setActivityProject}
          data={data}
          projects={this.props.projects}
          pauseStopwatch={this.props.actions.pauseStopwatch}
          startStopwatch={this.props.actions.startStopwatch}
          submit={this.submit}
          error={this.props.error}
          isConnecting={isConnecting}
          user={this.props.user}
        />
        <Notifications notifications={getNotifications(error, false)} />
      </div>
    );
  }
}

TimerScreenContainer.propTypes = {
  actions: PropTypes.shape({
    readStopwatch: PropTypes.func.isRequired,
    readProjectEntities: PropTypes.func.isRequired,
    setActivityDate: PropTypes.func.isRequired,
    setStopwatchHours: PropTypes.func.isRequired,
    setStopwatchMinutes: PropTypes.func.isRequired,
    setActivityProject: PropTypes.func.isRequired,
    pauseStopwatch: PropTypes.func.isRequired,
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

  projects: PropTypes.arrayOf(PropTypes.object),

  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

TimerScreenContainer.defaultProps = {
  data: null,
  error: null,
  isConnecting: false,
  projects: null,
};

const mapStateToProps = state => ({
  data: getStopwatch(state),
  projects: readEntitiesByQueries(state, ['?include=author']),
  isConnecting: state.stopwatches.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({ readProjectEntities }, dispatch),
    ...bindActionCreators(TimerActions, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerScreenContainer);
