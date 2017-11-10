import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import { getNotifications } from '../utils';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import Notifications from '../../../ui/app/utils/Notifications';
import ProjectFormAppBar from '../../../ui/app/projects/ProjectFormAppBar';
import ProjectForm from '../../../ui/app/projects/ProjectForm';
import { deleteEntity } from './ProjectActions';

class ProjectFormScreenContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.entity && nextProps.entity) {
      this.props.setValues(this.props.toFormValues(nextProps.entity));
    }
  }

  deleteEntity = (id) => {
    this.props.deleteEntity(id, this.redirectToList);
  }

  redirectToList = () => {
    this.props.history.push('/app/projects');
  };

  render() {
    const { entity, error, handleChange, handleSubmit, isConnecting, values } = this.props;
    const isEditing = entity && isString(entity.id);

    return (
      <div>
        <ProjectFormAppBar
          deleteHandler={() => this.deleteEntity(entity.id)}
          goBackHandler={this.props.history.goBack}
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
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  isConnecting: PropTypes.bool,
  setValues: PropTypes.func.isRequired,
  toFormValues: PropTypes.func.isRequired,
  values: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

ProjectFormScreenContainer.defaultProps = {
  entity: undefined,
  error: undefined,
  isConnecting: false,
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteEntity }, dispatch),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(ProjectFormScreenContainer);
