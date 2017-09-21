import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as ProjectActions from './ProjectActions';
import { readEntitiesByQueries, getEntitiesPaginationByQuery } from './ProjectReducers';
import ProjectsSection from '../../../ui/app/projects/ProjectsSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectsSectionContainer extends Component {

  componentDidMount() {
    this.readMore();
  }

  itemsPerPage = 3;

  readMore = () => {
    this.props.actions.readEntities(this.props.getNextPageQuery(this.itemsPerPage));
  }

  shouldDisplayLoadButton = () => {
    const { pagination, isConnecting } = this.props.projects;
    return pagination && pagination.next && !isConnecting;
  };

  render() {
    const { isConnecting, error } = this.props.projects;

    return (
      <div>
        <ProjectsSection
          createEntity={this.props.actions.createEntity}
          error={error}
          isConnecting={this.props.projects.isConnecting}
          data={this.props.projects.list}
          user={this.props.user}
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

ProjectsSectionContainer.propTypes = {
  getNextPageQuery: PropTypes.func.isRequired,

  actions: PropTypes.shape({
    createEntity: PropTypes.func.isRequired,
    readEntities: PropTypes.func.isRequired,
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

ProjectsSectionContainer.defaultProps = {
  projects: null,
  user: null,
};

const mapStateToProps = (state, { queries = [] }) => {
  const pagination = queries.length ?
    getEntitiesPaginationByQuery(state, queries[queries.length - 1]) : null;

  return ({
    projects: {
      list: readEntitiesByQueries(state, queries),
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
)(ProjectsSectionContainer);
