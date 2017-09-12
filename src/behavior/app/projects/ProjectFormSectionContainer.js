import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from './ProjectActions';
import { denormalizeItem } from './ProjectReducers';
import ProjectFormSection from '../../../ui/app/projects/ProjectFormSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

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
    if (!id) return;

    const cachedProject = denormalizeItem(this.props.projects.byId[id]);
    if (cachedProject) {
      this.setState({ project: cachedProject });
      return;
    }

    this.setState({ isFetching: true });

    this.props.actions.getProject(id).then((project) => {
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
    // this is needed to fix an issue with UI.
    // due to the use of ref={} in child component,
    // form component gets outdated when editing a project
    // when calling callback to submit data.
    this.setState({
      project: Object.assign({}, this.state.project, data),
    });
    //

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
    const { isFetching, error } = this.props.projects;

    return (
      <div>
        <ProjectFormSection
          submitHandler={this.getSubmitHandler()}
          error={this.props.projects.error}
          isFetching={this.state.isFetching}
          project={this.state.project}
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
    getProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
  }).isRequired,

  params: PropTypes.shape({
    projectId: PropTypes.string,
  }).isRequired,

  projects: PropTypes.shape({
    byId: PropTypes.object,
    error: PropTypes.array,
    isFetching: PropTypes.bool,
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
