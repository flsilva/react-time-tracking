import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { AppBar } from 'react-toolbox/lib/app_bar';
import ProjectForm from './ProjectForm';
import ErrorMessages from '../error/ErrorMessages';

class ProjectFormSection extends Component {
  backHandler = () => {
    browserHistory.goBack();
  }

  submitHandler = () => {
    this.projectForm.saveHandler();
  }

  render() {
    const title = (this.props.isFetching || this.props.project) ? 'Edit Project' : 'New Project';

    return (
      <div className="ProjectFormSection">
        <AppBar
          onLeftIconClick={this.backHandler}
          onRightIconClick={this.submitHandler}
          leftIcon="arrow_back"
          rightIcon="done"
          title={title}
        />
        <ProjectForm
          ref={(node) => { this.projectForm = node; }}
          isFetching={this.props.isFetching}
          project={this.props.project}
          submitHandler={this.props.submitHandler}
        />
        <ErrorMessages error={this.props.error} />
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
