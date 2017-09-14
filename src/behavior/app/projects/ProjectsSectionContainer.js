import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from './ProjectActions';
import { getCollection } from './ProjectReducers';
import ProjectsSection from '../../../ui/app/projects/ProjectsSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectsSectionContainer extends Component {

  componentDidMount() {
    if (this.props.projects.isFetched) return;
    this.props.actions.getProjects();
  }

  render() {
    const { isFetching, error } = this.props.projects;

    return (
      <div>
        <ProjectsSection
          addProject={this.props.actions.addProject}
          error={error}
          isFetching={this.props.projects.isFetching}
          data={this.props.projects.list}
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
    list: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
    isFetching: PropTypes.bool,
    isFetched: PropTypes.bool,
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
  projects: {
    list: getCollection(state),
    error: state.projects.error,
    isFetching: state.projects.isFetching,
    isFetched: state.projects.isFetched,
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsSectionContainer);
