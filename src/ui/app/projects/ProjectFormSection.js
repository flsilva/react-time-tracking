import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ProjectForm from './ProjectForm';

const bodyStyles = {
  margin: '20px',
};

class ProjectFormSection extends Component {
  backHandler = () => {
    browserHistory.goBack();
  }

  submitHandler = () => {
    this.projectForm.saveHandler();
  }

  render() {
    const { isEditing, isFetching, project } = this.props;
    const title = isEditing ? 'Edit Project' : 'New Project';

    const BackButton = (
      <IconButton onClick={this.backHandler}>
        <FontIcon className="material-icons">arrow_back</FontIcon>
      </IconButton>
    );

    const SaveButton = (
      <IconButton onClick={this.submitHandler} disabled={isFetching}>
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
        <div style={bodyStyles}>
          <ProjectForm
            ref={(node) => { this.projectForm = node; }}
            isFetching={this.props.isFetching}
            project={this.props.project}
            submitHandler={this.props.submitHandler}
          />
        </div>
      </div>
    );
  }
}

ProjectFormSection.propTypes = {
  isEditing: PropTypes.bool,

  isFetching: PropTypes.bool,

  project: PropTypes.shape({
    name: PropTypes.string,
  }),

  submitHandler: PropTypes.func.isRequired,
};

ProjectFormSection.defaultProps = {
  isEditing: false,
  isFetching: false,
  project: null,
};

export default ProjectFormSection;
