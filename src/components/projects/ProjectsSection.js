import React, { Component } from 'react'
import ProjectListComponent from './ProjectList'
import ProjectFormComponent from './ProjectForm'

class ProjectsSection extends Component {
  render() {
    console.log('ProjectsContainer().render() - this: ', this)

    return (
      <div className="ProjectsContainer">
        <p>
          Projects section
        </p>
        <ProjectListComponent data={this.props.projects} />
        <ProjectFormComponent submitHandler={this.props.actions.addProject} />
      </div>
    )
  }
}

export default ProjectsSection
