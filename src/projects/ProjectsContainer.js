import React, { Component } from 'react';
import ProjectList from './ProjectList';
import CreateProject from './CreateProject';

class ProjectsContainer extends Component {
  render() {
    console.log('ProjectsContainer().render() - this: ', this)

    return (
      <div className="ProjectsContainer">
        <p>
          Projects section
        </p>
        <ProjectList data={this.props.projects} />
        <CreateProject submitHandler={this.props.actions.addProject} />
      </div>
    );
  }
}

export default ProjectsContainer;
