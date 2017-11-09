import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddFAB from '../../../ui/common/button/AddFAB';
import ProjectList from '../../../ui/app/projects/ProjectList';
import Notifications from '../../../ui/app/utils/Notifications';
import SimpleAppBar from '../../../ui/app/header/SimpleAppBar';
import { getNotifications } from '../utils';
import { readEntities } from './ProjectActions';
import { getEntities } from './ProjectState';

class ProjectListScreenContainer extends Component {
  componentDidMount() {
    const query = this.props.getQuery ? this.props.getQuery() : undefined;
    this.props.actions.readEntities(query);
  }

  onClickNewProject = () => {
    this.context.router.history.push('/app/projects/new');
  }

  onClickProjectItem = (id) => {
    this.context.router.history.push(`/app/projects/${id}`);
  }

  render() {
    const { entities, error, isConnecting } = this.props;

    return (
      <div>
        <SimpleAppBar title="Projects" />
        <ProjectList entities={entities} onClickProjectItem={this.onClickProjectItem} />
        {!isConnecting &&
          <AddFAB onClick={this.onClickNewProject} />
        }
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

ProjectListScreenContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

ProjectListScreenContainer.propTypes = {
  actions: PropTypes.shape({
    readEntities: PropTypes.func.isRequired,
  }).isRequired,

  entities: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.arrayOf(PropTypes.object),

  getQuery: PropTypes.func,

  isConnecting: PropTypes.bool,
};

ProjectListScreenContainer.defaultProps = {
  entities: undefined,
  error: undefined,
  getQuery: undefined,
  isConnecting: undefined,
};

const mapStateToProps = (state, { getQuery }) => {
  const query = getQuery ? getQuery() : undefined;
  const result = getEntities(state, query);
  const entities = result ? result.entities : undefined;

  return {
    entities,
    error: state.projects.error,
    isConnecting: state.projects.isConnecting,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ readEntities }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectListScreenContainer);
