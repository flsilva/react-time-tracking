import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Formik } from 'formik';
import CircularProgress from 'material-ui/CircularProgress';
import Notifications from '../../../ui/app/utils/Notifications';
import TimeLogAppBar from '../../../ui/app/time-logs/TimeLogAppBar';
import TimeLogForm from '../../../ui/app/time-logs/TimeLogForm';
import { getNotifications } from '../utils';
import { getTimeObjectFromSeconds } from '../utils/TimeUtils';
import * as TimeLogActions from './TimeLogActions';
import { readEntityById } from './TimeLogState';
import ProjectDropDownContainer from '../projects/ProjectDropDownContainer';

class TimeLogFormScreenContainer extends Component {

  componentDidMount() {
    const id = this.props.params.timeLogId;
    if (id) this.props.actions.readEntity(id, { include: 'author,project' });
  }

  getSubmitHandler = () => (
    this.props.entity && this.props.entity.id ? this.updateEntity : this.createEntity
  );

  createEntity = (data) => {
    this.props.actions.createEntity(data, this.redirectToList);
  };

  deleteEntity = (id) => {
    this.props.actions.deleteEntity(id, this.redirectToList);
  };

  updateEntity = (data) => {
    this.props.actions.updateEntity(this.props.entity.id, data, this.redirectToList);
  };

  redirectToList = () => {
    browserHistory.push('/app/time-logs');
  };

  toFormValues = (entity = {}) => {
    const { logDate, description, loggedTime, project } = entity;
    const projectId = project && project.id ? project.id : '26';
    const time = loggedTime ?
      getTimeObjectFromSeconds(loggedTime) : { hours: 0, minutes: 0 };

    return {
      date: logDate || new Date(),
      description: description || '',
      hours: time.hours,
      minutes: time.minutes,
      projectId,
    };
  }

  toEntityValues = (formValues) => {
    if (formValues === undefined) return {};

    const { date, description, hours, minutes, projectId } = formValues;
    return {
      logDate: date,
      description,
      loggedTime: (hours * 3600) + (minutes * 60),
      projectId,
    };
  }

  render() {
    const { entity, error, isConnecting } = this.props;
    const initialValues = this.toFormValues(entity);
    if (!initialValues.date) initialValues.date = new Date();

    if (isConnecting) {
      const loadingContainerStyles = {
        alignItems: 'center',
        display: 'flex',
        height: window.innerHeight,
        justifyContent: 'center',
      };

      return (
        <div style={loadingContainerStyles}>
          <CircularProgress
            color={'rgb(0, 188, 212)'}
            size={50}
            thickness={4}
            style={{ transform: 'translate(0, -50%)' }}
          />
        </div>
      );
    }

    return (
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            this.getSubmitHandler()(this.toEntityValues(values));
          }}
          render={({ values, handleChange, handleSubmit, setFieldValue }) => (
            <div>
              <TimeLogAppBar
                deleteHandler={this.deleteEntity}
                entityId={entity && entity.id ? entity.id : undefined}
                goBackHandler={browserHistory.goBack}
                submitHandler={handleSubmit}
              />
              <TimeLogForm
                onCustomInputChange={setFieldValue}
                onInputChange={handleChange}
                projectDropDownClass={ProjectDropDownContainer}
                values={values}
              />
            </div>
          )}
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

  entity: PropTypes.shape({ id: PropTypes.string }),
  error: PropTypes.arrayOf(PropTypes.object),
  isConnecting: PropTypes.bool,

  params: PropTypes.shape({
    timeLogId: PropTypes.string,
  }).isRequired,
};

TimeLogFormScreenContainer.defaultProps = {
  entity: undefined,
  error: undefined,
  isConnecting: false,
};

const mapStateToProps = (state, { params }) => ({
  entity: params && params.timeLogId ? readEntityById(state, params.timeLogId) : undefined,
  error: state.timeLogs.error,
  isConnecting: state.timeLogs.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TimeLogActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeLogFormScreenContainer);
