import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import * as ProjectActions from './ProjectActions';
import { getEntityById } from './ProjectState';
import ProjectFormScreen from '../../../ui/app/projects/ProjectFormScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class ProjectFormScreenContainer extends Component {

  componentDidMount() {
    const id = this.props.match.params.projectId;
    const query = (this.props.getQuery) ? this.props.getQuery() : undefined;
    if (id) this.props.actions.readEntity(id, query);
  }

  getSubmitHandler = () => (
    (this.props.projects.data) ? this.updateEntity : this.createEntity
  )

  createEntity = (data) => {
    this.props.actions.createEntity(data, this.redirectToList);
  }

  deleteHandler = (id) => {
    this.props.actions.deleteEntity(id, this.redirectToList);
  }

  updateEntity = (data) => {
    // this is needed to fix an issue with UI.
    // due to the use of ref={} in child component,
    // form component gets outdated when editing a project
    // when calling callback to submit data.
    // this.setState({
    //  project: Object.assign({}, this.state.project, data),
    // });

    const id = this.props.projects.data.id;
    this.props.actions.updateEntity(id, data, this.redirectToList);
  }

  redirectToList = () => {
    this.props.history.push('/app/projects');
  }

  render() {
    const { data, error, isConnecting } = this.props.projects;

    return (
      <div>
        <ProjectFormScreen
          delete={this.deleteHandler}
          goBackHandler={this.props.history.goBack}
          submitHandler={this.getSubmitHandler()}
          error={this.props.projects.error}
          isEditing={isString(this.props.match.params.projectId)}
          isConnecting={isConnecting}
          project={data}
        />
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

ProjectFormScreenContainer.propTypes = {
  actions: PropTypes.shape({
    createEntity: PropTypes.func.isRequired,
    readEntity: PropTypes.func.isRequired,
    updateEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
  }).isRequired,

  getQuery: PropTypes.func,

  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }).isRequired,
  }).isRequired,

  projects: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.array,
    isConnecting: PropTypes.bool,
  }).isRequired,
};

ProjectFormScreenContainer.defaultProps = {
  getQuery: undefined,
  projects: {
    data: {},
  },
};

const mapStateToProps = (state, { match }) => ({
  projects: {
    data: match.params.projectId ? getEntityById(state, match.params.projectId) : undefined,
    error: state.projects.error,
    isConnecting: state.projects.isConnecting,
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFormScreenContainer);
