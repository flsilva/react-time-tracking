import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TimeLogActions from './TimeLogActions';
import { readEntityById } from './TimeLogState';
import TimeLogFormScreen from '../../../ui/app/time-logs/TimeLogFormScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class TimeLogFormScreenContainer extends Component {

  componentDidMount() {
    const id = this.props.params.timeLogId;
    if (id) this.props.actions.readEntity(id, { include: 'author,project' });
  }

  getSubmitHandler = () => (
    (this.props.timeLogs.data) ? this.updateEntity : this.createEntity
  )

  createEntity = (data) => {
    this.props.actions.createEntity(data, this.redirectToList);
  }

  deleteHandler = (id) => {
    this.props.actions.deleteEntity(id, this.redirectToList);
  }

  updateEntity = (data) => {
    const id = this.props.timeLogs.data.id;
    this.props.actions.updateEntity(id, data, this.redirectToList);
  }

  redirectToList = () => {
    browserHistory.push('/app/time-logs');
  }

  render() {
    const { error, isConnecting, data } = this.props.timeLogs;

    return (
      <div>
        <TimeLogFormScreen
          delete={this.deleteHandler}
          submitHandler={this.getSubmitHandler()}
          error={this.props.timeLogs.error}
          isEditing={this.props.params.timeLogId != null}
          isConnecting={isConnecting}
          timeLog={data}
          user={this.props.user}
        />
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

TimeLogFormScreenContainer.propTypes = {
  actions: PropTypes.shape({
    createEntity: PropTypes.func.isRequired,
    readEntity: PropTypes.func.isRequired,
    updateEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
  }).isRequired,

  params: PropTypes.shape({
    timeLogId: PropTypes.string,
  }).isRequired,

  timeLogs: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.array,
    isConnecting: PropTypes.bool,
  }).isRequired,

  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

TimeLogFormScreenContainer.defaultProps = {
  timeLogs: {
    data: {},
  },
};

const mapStateToProps = (state, { params }) => ({
  timeLogs: {
    data: readEntityById(state, params.timeLogId),
    error: state.timeLogs.error,
    isConnecting: state.timeLogs.isConnecting,
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TimeLogActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeLogFormScreenContainer);
