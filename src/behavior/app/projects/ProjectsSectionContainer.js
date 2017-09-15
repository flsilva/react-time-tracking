import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as ProjectActions from './ProjectActions';
import { getCollectionByQueries, getCollectionLinksByQuery } from './ProjectReducers';
import ProjectsSection from '../../../ui/app/projects/ProjectsSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectsSectionContainer extends Component {

  componentDidMount() {
    this.readMore();
  }

  readMore = () => {
    this.props.actions.getProjects(this.props.getNextPageQuery());
  }

  shouldDisplayLoadButton = () => {
    const { listLinks, isFetching } = this.props.projects;
    return listLinks && listLinks.next && !isFetching;
  };

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
        {this.shouldDisplayLoadButton() &&
          <RaisedButton
            primary
            fullWidth
            disabled={this.props.projects.isFetching}
            style={{ marginTop: 20 }}
            label="Load More"
            onClick={this.readMore}
          />
        }
        <Notifications notifications={getNotifications(error, isFetching)} />
      </div>
    );
  }

}

ProjectsSectionContainer.propTypes = {
  getNextPageQuery: PropTypes.func.isRequired,

  actions: PropTypes.shape({
    addProject: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
  }).isRequired,

  projects: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    listLinks: PropTypes.shape({
      next: PropTypes.string,
    }),
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

const mapStateToProps = (state, { queries }) => {
  const totalQueries = queries ? queries.length : 0;

  const listLinks = totalQueries ?
    getCollectionLinksByQuery(state, queries[totalQueries - 1]) : null;

  return ({
    projects: {
      list: getCollectionByQueries(state, queries),
      listLinks,
      error: state.projects.error,
      isFetching: state.projects.isFetching,
      isFetched: state.projects.isFetched,
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
