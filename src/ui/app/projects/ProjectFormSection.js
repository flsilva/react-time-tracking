import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { AppBar } from 'react-toolbox/lib/app_bar'
import ProjectForm from './ProjectForm'
import ErrorMessages from '../error/ErrorMessages'

class ProjectFormSection extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    project: PropTypes.object,
    user: PropTypes.object
  }

  backHandler = () => {
    browserHistory.goBack()
  }

  submitHandler = () => {
    this.projectForm.saveHandler()
  }

  render() {
    const title = (this.props.isFetching || this.props.project) ? 'Edit Project' : 'New Project'

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
    )
  }
}

export default ProjectFormSection
