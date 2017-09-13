import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from './ProjectActions';
import ProjectFormSection from '../../../ui/app/projects/ProjectFormSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectFormSectionContainer extends Component {

  componentDidMount() {
    const id = this.props.params.projectId;
    this.selectProject(id);
  }

  getSubmitHandler = () => (
    (this.props.projects.data) ? this.updateProject : this.addProject
  )

  selectProject = (id) => {
    if (!id) return;

    /*
    const cachedProject = denormalizeItem(this.props.projects.byId[id]);
    if (cachedProject) {
      this.setState({ project: cachedProject });
      return;
    }
    */

    this.props.actions.selectProject(id);
  }

  addProject = data => (
    new Promise((resolve, reject) => {
      this.props.actions.addProject(data)
        .then((responseData) => {
          resolve(responseData);
          browserHistory.push('/app/projects');
        }).catch((error) => {
          reject(error);
        });
    })
  );

  updateProject = (data) => {
    // this is needed to fix an issue with UI.
    // due to the use of ref={} in child component,
    // form component gets outdated when editing a project
    // when calling callback to submit data.
    // this.setState({
    //  project: Object.assign({}, this.state.project, data),
    // });
    //

    const id = this.props.projects.data.id;

    return new Promise((resolve, reject) => {
      this.props.actions.updateProject(id, data)
        .then((responseData) => {
          resolve(responseData);
          browserHistory.push('/app/projects');
        }).catch((error) => {
          reject(error);
        });
    });
  }

  render() {
    const { error, isFetching, data } = this.props.projects;

    return (
      <div>
        <ProjectFormSection
          submitHandler={this.getSubmitHandler()}
          error={this.props.projects.error}
          isFetching={isFetching}
          project={data}
          user={this.props.user}
        />
        <Notifications notifications={getNotifications(error, isFetching)} />
      </div>
    );
  }
}

ProjectFormSectionContainer.propTypes = {
  actions: PropTypes.shape({
    addProject: PropTypes.func.isRequired,
    selectProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
  }).isRequired,

  params: PropTypes.shape({
    projectId: PropTypes.string,
  }).isRequired,

  projects: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.array,
    isFetching: PropTypes.bool,
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

const mapStateToProps = state => ({
  projects: {
    data: state.projects.selectedEntity,
    error: state.projects.error,
    isFetching: state.projects.isFetching,
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFormSectionContainer);
