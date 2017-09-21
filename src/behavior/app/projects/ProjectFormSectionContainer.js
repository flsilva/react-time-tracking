import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from './ProjectActions';
import { readEntityById } from './ProjectReducers';
import ProjectFormSection from '../../../ui/app/projects/ProjectFormSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectFormSectionContainer extends Component {

  componentDidMount() {
    const id = this.props.params.projectId;
    if (id) this.props.actions.readEntity(id, '?include=author');
  }

  getSubmitHandler = () => (
    (this.props.projects.data) ? this.updateEntity : this.createEntity
  )

  createEntity = (data) => {
    this.props.actions.createEntity(data, this.redirectToList);

    /*
    new Promise((resolve, reject) => {
      this.props.actions.createEntity(data)
        .then((responseData) => {
          resolve(responseData);
          browserHistory.push('/app/projects');
        }).catch((error) => {
          reject(error);
        });
    })
    */
  }

  deleteHandler = (id) => {
    this.props.actions.deleteEntity(id, this.redirectToList);
  }

  updateEntity = (data) => {
    // this is needed to fix an issue with UI.
    // due to the use of ref={} in child component,
    // form component gets outdated when editing a project
    // when calling callback to submit data.
    // this.setState({
    //  project: Object.assign({}, this.state.project, data),
    // });

    const id = this.props.projects.data.id;
    this.props.actions.updateEntity(id, data, this.redirectToList);
  }

  redirectToList = () => {
    browserHistory.push('/app/projects');
  }

  render() {
    const { error, isConnecting, data } = this.props.projects;

    return (
      <div>
        <ProjectFormSection
          delete={this.deleteHandler}
          submitHandler={this.getSubmitHandler()}
          error={this.props.projects.error}
          isEditing={this.props.params.projectId != null}
          isConnecting={isConnecting}
          project={data}
          user={this.props.user}
        />
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

ProjectFormSectionContainer.propTypes = {
  actions: PropTypes.shape({
    createEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    readEntity: PropTypes.func.isRequired,
    updateEntity: PropTypes.func.isRequired,
  }).isRequired,

  params: PropTypes.shape({
    projectId: PropTypes.string,
  }).isRequired,

  projects: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.array,
    isConnecting: PropTypes.bool,
  }).isRequired,

  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

ProjectFormSectionContainer.defaultProps = {
  projects: {
    data: {},
  },
};

const mapStateToProps = (state, { params }) => ({
  projects: {
    data: readEntityById(state, params.projectId),
    error: state.projects.error,
    isConnecting: state.projects.isConnecting,
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFormSectionContainer);
