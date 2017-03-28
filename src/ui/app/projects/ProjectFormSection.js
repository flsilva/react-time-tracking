import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { AppBar } from 'react-toolbox/lib/app_bar'
import ProjectForm from './ProjectForm'
import ErrorMessages from '../error/ErrorMessages'

class ProjectFormSection extends Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  backHandler = () => {
    browserHistory.goBack()
  }

  submitHandler = () => {
    this.projectForm.saveHandler()
  }

  render() {
    return (
      <div className="ProjectFormSection">
        <AppBar
            onLeftIconClick={this.backHandler}
            onRightIconClick={this.submitHandler}
            leftIcon="arrow_back"
            rightIcon="done"
            title="New Project"
          />
        <ProjectForm ref={(node) => { this.projectForm = node; }} data={this.props.projects} submitHandler={this.props.submitHandler} />
        <ErrorMessages error={this.props.error} />
      </div>
    )
  }
}

export default ProjectFormSection
