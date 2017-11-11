import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { getNotifications } from '../utils';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import Notifications from '../../../ui/app/utils/Notifications';
import ProjectFormAppBar from '../../../ui/app/projects/ProjectFormAppBar';
import ProjectForm from '../../../ui/app/projects/ProjectForm';

class ProjectFormScreenContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.entity && nextProps.entity) {
      this.props.setValues(this.props.toFormValues(nextProps.entity));
    }
  }

  render() {
    const { entity, error, handleChange, handleSubmit, isConnecting, values } = this.props;
    const isEditing = entity && isString(entity.id);

    return (
      <div>
        <ProjectFormAppBar
          deleteHandler={this.props.deleteEntity}
          goBackHandler={this.props.navBack}
          isEditing={isEditing}
          submitHandler={handleSubmit}
        />
        <ScreenBody>
          <ProjectForm onInputChange={handleChange} values={values} />
          {entity && entity.author &&
            <p>Author: {entity.author.email}</p>
          }
        </ScreenBody>
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

ProjectFormScreenContainer.propTypes = {
  deleteEntity: PropTypes.func.isRequired,
  entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
  error: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool,
  navBack: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  toFormValues: PropTypes.func.isRequired,
  values: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

ProjectFormScreenContainer.defaultProps = {
  entity: undefined,
  error: undefined,
  isConnecting: false,
};

export default ProjectFormScreenContainer;
