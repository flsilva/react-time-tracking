import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from './ProjectActions';
import ProjectFormSection from '../../../ui/app/projects/ProjectFormSection';

class ProjectFormSectionContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const id = this.props.params.projectId;
    this.getProject(id);
  }

  getProject = (id) => {
    // eslint-disable-next-line no-console
    console.log('ProjectFormSectionContainer::getProject() - this: ', this);

    if (!id) return;

    this.setState({ isFetching: true });

    // eslint-disable-next-line no-console
    console.log('ProjectFormSectionContainer().getProject() - this.state.isFetching: ', this.state.isFetching);

    this.props.actions.getProject(id).then((project) => {
      // eslint-disable-next-line no-console
      console.log('ProjectFormSectionContainer().getProject().actions.getProject(id).then() - project: ', project);

      this.setState({
        project,
        isFetching: false,
      });
    });
  }

  getSubmitHandler = () => (
    (this.state.project) ? this.updateProject : this.addProject
  )

  addProject = data => (
    new Promise((resolve, reject) => {
      this.props.actions.addProject(data)
        .then((responseData) => {
          // eslint-disable-next-line no-console
          console.log('ProjectFormSectionContainer::addProject().then() - responseData: ', responseData);
          resolve(responseData);
          browserHistory.push('/app/projects');
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log('ProjectFormSectionContainer::addProject().catch() - error: ', error);
          reject(error);
        });
    })
  );

  updateProject = (data) => {
    const id = this.state.project.id;

    return new Promise((resolve, reject) => {
      this.props.actions.updateProject(id, data)
        .then((responseData) => {
          // eslint-disable-next-line no-console
          console.log('ProjectFormSectionContainer::updateProject().then() - responseData: ', responseData);
          resolve(responseData);
          browserHistory.push('/app/projects');
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log('ProjectFormSectionContainer::updateProject().catch() - error: ', error);
          reject(error);
        });
    });
  }

  render() {
    // eslint-disable-next-line no-console
    console.log('ProjectFormSectionContainer::render() - this.state.isFetching: ', this.state.isFetching);

    return (
      <ProjectFormSection
        submitHandler={this.getSubmitHandler()}
        error={this.props.projects.error}
        isFetching={this.state.isFetching}
        project={this.state.project}
        user={this.props.user}
      />
    );
  }
}

ProjectFormSectionContainer.propTypes = {
  actions: PropTypes.shape({
    addProject: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
  }).isRequired,

  params: PropTypes.shape({
    projectId: PropTypes.string,
  }).isRequired,

  projects: PropTypes.shape({
    error: PropTypes.object,
  }).isRequired,

  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFormSectionContainer);
