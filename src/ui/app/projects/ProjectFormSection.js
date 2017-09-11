import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ProjectForm from './ProjectForm';
import Notifications from '../utils/Notifications';

class ProjectFormSection extends Component {
  backHandler = () => {
    browserHistory.goBack();
  }

  submitHandler = () => {
    this.projectForm.saveHandler();
  }

  render() {
    const title = (this.props.isFetching || this.props.project) ? 'Edit Project' : 'New Project';

    const BackButton = (
      <IconButton onClick={this.backHandler}>
        <FontIcon className="material-icons">arrow_back</FontIcon>
      </IconButton>
    );

    const SaveButton = (
      <IconButton onClick={this.submitHandler}>
        <FontIcon className="material-icons">done</FontIcon>
      </IconButton>
    );

    return (
      <div className="ProjectFormSection">
        <AppBar
          iconElementLeft={BackButton}
          iconElementRight={SaveButton}
          title={title}
        />
        <ProjectForm
          ref={(node) => { this.projectForm = node; }}
          isFetching={this.props.isFetching}
          project={this.props.project}
          submitHandler={this.props.submitHandler}
        />
        <Notifications notifications={this.props.error} />
      </div>
    );
  }
}

ProjectFormSection.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  isFetching: PropTypes.bool,

  project: PropTypes.shape({
    name: PropTypes.string,
  }),

  submitHandler: PropTypes.func.isRequired,
};

ProjectFormSection.defaultProps = {
  error: null,
  isFetching: false,
  project: null,
};

export default ProjectFormSection;
