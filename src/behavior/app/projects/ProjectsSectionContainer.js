import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from './ProjectActions';
import ProjectsSection from '../../../ui/app/projects/ProjectsSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectsSectionContainer extends Component {

  componentDidMount() {
    this.props.actions.getProjects();
  }

  render() {
    const { isFetching, error } = this.props.projects;

    return (
      <div>
        <ProjectsSection
          addProject={this.props.actions.addProject}
          error={error}
          projects={this.props.projects.data}
          user={this.props.user}
        />
        <Notifications notifications={getNotifications(error, isFetching)} />
      </div>
    );
  }

}

ProjectsSectionContainer.propTypes = {
  actions: PropTypes.shape({
    addProject: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
  }).isRequired,

  projects: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
    isFetching: PropTypes.bool,
  }),

  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

ProjectsSectionContainer.defaultProps = {
  projects: null,
  user: null,
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
)(ProjectsSectionContainer);
