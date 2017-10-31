import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as ProjectActions from './ProjectActions';
import { getEntities, getEntitiesPaginationByQuery } from './ProjectState';
import ProjectListScreen from '../../../ui/app/projects/ProjectListScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectListScreenContainer extends Component {
  componentDidMount() {
    this.readMore();
  }

  readMore = () => {
    const query = this.props.getNextPageQuery();
    this.props.actions.readEntities(query);
  }

  shouldDisplayLoadButton = () => {
    const { pagination, isConnecting } = this.props.projects;
    return pagination && pagination.next && !isConnecting;
  };

  render() {
    const { isConnecting, error } = this.props.projects;

    return (
      <div>
        <ProjectListScreen
          createEntity={this.props.actions.createEntity}
          error={error}
          isConnecting={this.props.projects.isConnecting}
          data={this.props.projects.list}
          user={this.props.user}
          onClickNewProject={() => this.props.history.push('/app/projects/new')}
          onClickProjectItem={id => this.props.history.push(`/app/projects/${id}`)}
        />
        {this.shouldDisplayLoadButton() &&
          <RaisedButton
            primary
            fullWidth
            disabled={this.props.projects.isConnecting}
            style={{ marginTop: 20 }}
            label="Load More"
            onClick={this.readMore}
          />
        }
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }

}

ProjectListScreenContainer.propTypes = {
  getNextPageQuery: PropTypes.func.isRequired,

  actions: PropTypes.shape({
    createEntity: PropTypes.func.isRequired,
    readEntities: PropTypes.func.isRequired,
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

  projects: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.shape({
      next: PropTypes.string,
    }),
    error: PropTypes.arrayOf(PropTypes.object),
    isConnecting: PropTypes.bool,
  }),

  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

ProjectListScreenContainer.defaultProps = {
  projects: null,
  user: null,
};

const mapStateToProps = (state, { queries }) => {
  const queriesArray = Object.keys(queries)
    .map(key => queries[key]);

  const pagination = queriesArray.length ?
    getEntitiesPaginationByQuery(state, queriesArray[queriesArray.length - 1]) : null;

  return ({
    projects: {
      list: getEntities(state, queriesArray),
      pagination,
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
