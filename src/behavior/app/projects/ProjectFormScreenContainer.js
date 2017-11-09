import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import isString from 'lodash/isString';
import * as ProjectActions from './ProjectActions';
import { getEntityById } from './ProjectState';
import FullHeightCentralizedChildren from '../../../ui/common/FullHeightCentralizedChildren';
import CircularLoading from '../../../ui/common/CircularLoading';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import Notifications from '../../../ui/app/utils/Notifications';
import ProjectFormAppBar from '../../../ui/app/projects/ProjectFormAppBar';
import ProjectForm from '../../../ui/app/projects/ProjectForm';
import { getNotifications } from '../utils';

class ProjectFormScreenContainer extends Component {

  componentDidMount() {
    const id = this.props.match.params.projectId;
    const query = (this.props.getQuery) ? this.props.getQuery() : undefined;
    if (id) this.props.actions.readEntity(id, query);
  }

  getSubmitHandler = () => (
    this.props.entity ? this.updateEntity : this.createEntity
  )

  createEntity = (data) => {
    this.props.actions.createEntity(data, this.redirectToList);
  }

  deleteEntity = (id) => {
    this.props.actions.deleteEntity(id, this.redirectToList);
  }

  updateEntity = (data) => {
    const id = this.props.entity.id;
    this.props.actions.updateEntity(id, data, this.redirectToList);
  }

  redirectToList = () => {
    this.props.history.push('/app/projects');
  }

  toFormValues = (entity = {}) => ({
    name: entity.name || '',
  })

  render() {
    const { entity, error, isConnecting } = this.props;
    const isEditing = entity && isString(entity.id);
    const initialValues = this.toFormValues(entity);
    const title = isEditing ? 'Edit Project' : 'New Project';

    if (isConnecting) {
      return (
        <FullHeightCentralizedChildren>
          <CircularLoading style={{ transform: 'translate(0, -50%)' }} />
        </FullHeightCentralizedChildren>
      );
    }

    return (
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            this.getSubmitHandler()(values);
          }}
          render={({ values, handleChange, handleSubmit }) => (
            <div>
              <ProjectFormAppBar
                deleteHandler={() => this.deleteEntity(entity.id)}
                goBackHandler={this.props.history.goBack}
                submitHandler={handleSubmit}
                title={title}
              />
              <ScreenBody>
                <ProjectForm onInputChange={handleChange} values={values} />
                {entity && entity.author &&
                  <p>Author: {entity.author.email}</p>
                }
              </ScreenBody>
            </div>
          )}
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

  entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
  error: PropTypes.arrayOf(PropTypes.object),
  isConnecting: PropTypes.bool,
};

ProjectFormScreenContainer.defaultProps = {
  getQuery: undefined,
  entity: undefined,
  error: undefined,
  isConnecting: false,
};

const mapStateToProps = (state, { match }) => ({
  entity: match.params.projectId ? getEntityById(state, match.params.projectId) : undefined,
  error: state.projects.error,
  isConnecting: state.projects.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectFormScreenContainer);
