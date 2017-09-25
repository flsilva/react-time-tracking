import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TimerActions from './TimerActions';
import { readEntities as readProjectEntities } from '../projects/ProjectActions';
import { readEntitiesByQueries } from '../projects/ProjectReducers';
import TimerScreen from '../../../ui/app/timer/TimerScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class TimerScreenContainer extends Component {

  componentDidMount() {
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
          datePicked={this.props.actions.pickDate}
          hourPicked={this.props.actions.pickHour}
          minutePicked={this.props.actions.pickMinute}
          projectPicked={this.props.actions.pickProject}
          projects={this.props.projects}
          toggle={this.props.actions.toggle}
          submit={this.submit}
          error={this.props.error}
          isConnecting={isConnecting}
          user={this.props.user}
        />
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

TimerScreenContainer.propTypes = {
  actions: PropTypes.shape({
    readProjectEntities: PropTypes.func.isRequired,
    pickDate: PropTypes.func.isRequired,
    pickHour: PropTypes.func.isRequired,
    pickMinute: PropTypes.func.isRequired,
    pickProject: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
  }).isRequired,

  data: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
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
  projects: readEntitiesByQueries(state, ['?include=author']),
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
