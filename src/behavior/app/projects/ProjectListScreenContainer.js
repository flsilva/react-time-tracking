import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from './ProjectActions';
import { getEntities } from './ProjectState';
import ProjectListScreen from '../../../ui/app/projects/ProjectListScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectListScreenContainer extends Component {
  componentDidMount() {
    const query = this.props.getQuery ? this.props.getQuery() : undefined;
    this.props.actions.readEntities(query);
  }

  render() {
    const { isConnecting, error } = this.props.projects;

    return (
      <div>
        <ProjectListScreen
          createEntity={this.props.actions.createEntity}
          error={error}
          isConnecting={this.props.projects.isConnecting}
          data={this.props.projects.entities}
          onClickNewProject={() => this.props.history.push('/app/projects/new')}
          onClickProjectItem={id => this.props.history.push(`/app/projects/${id}`)}
        />
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

ProjectListScreenContainer.propTypes = {
  actions: PropTypes.shape({
    createEntity: PropTypes.func.isRequired,
    readEntities: PropTypes.func.isRequired,
  }).isRequired,

  getQuery: PropTypes.func.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

  projects: PropTypes.shape({
    entities: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.shape({
      next: PropTypes.string,
    }),
    error: PropTypes.arrayOf(PropTypes.object),
    isConnecting: PropTypes.bool,
  }),
};

ProjectListScreenContainer.defaultProps = {
  projects: null,
};

const mapStateToProps = (state, { getQuery }) => {
  const query = getQuery ? getQuery() : undefined;
  const result = getEntities(state, query);
  const entities = result ? result.entities : undefined;

  return ({
    projects: {
      entities,
      error: state.projects.error,
      isConnecting: state.projects.isConnecting,
    },
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectListScreenContainer);
