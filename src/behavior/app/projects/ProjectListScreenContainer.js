import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';
import RaisedButton from 'material-ui/RaisedButton';
import AddFAB from '../../../ui/common/button/AddFAB';
import ProjectList from '../../../ui/app/projects/ProjectList';
import Notifications from '../../../ui/app/utils/Notifications';
import SimpleAppBar from '../../../ui/app/header/SimpleAppBar';
import { getNotifications } from '../utils';
import { readEntities } from './ProjectActions';
import { getEntities } from './ProjectState';

class ProjectListScreenContainer extends Component {
  componentDidMount() {
    this.readMore();
  }

  onClickNewProject = () => {
    this.context.router.history.push('/app/projects/new');
  }

  onClickProjectItem = (id) => {
    this.context.router.history.push(`/app/projects/${id}`);
  }

  readMore = () => {
    const query = this.props.getNextPageQuery();
    this.props.actions.readEntities(query);
  }

  shouldDisplayLoadButton = () => {
    const { pagination, isConnecting } = this.props;
    return pagination && pagination.next && !isConnecting;
  };

  render() {
    const { entities, error, isConnecting } = this.props;

    return (
      <div>
        <SimpleAppBar title="Projects" />
        <ProjectList entities={entities} onClickProjectItem={this.onClickProjectItem} />
        {!isConnecting &&
          <AddFAB onClick={this.onClickNewProject} />
        }
        {this.shouldDisplayLoadButton() &&
          <RaisedButton
            primary
            fullWidth
            disabled={isConnecting}
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

  getNextPageQuery: PropTypes.func.isRequired,

  isConnecting: PropTypes.bool,

  pagination: PropTypes.shape({
    next: PropTypes.string,
  }),
};

ProjectListScreenContainer.defaultProps = {
  entities: undefined,
  error: undefined,
  isConnecting: undefined,
  pagination: undefined,
};

const mapStateToProps = (state, { queries }) => {
  const results = queries && queries.length ?
    queries.map(query => getEntities(state, query))
      .filter(result => result)
    : undefined;

  const entities = results && results.length ?
    flatten(
      results.map(result => (
        result ? result.entities : undefined
      )),
    ) : undefined;

  const lastPageResult = queries && queries.length ?
    getEntities(state, queries[queries.length - 1]) : undefined;

  const pagination = lastPageResult ? lastPageResult.pagination : undefined;

  return {
    entities,
    pagination,
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
