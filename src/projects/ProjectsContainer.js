import React, { Component } from 'react';
import CreateProject from './CreateProject';

class ProjectsContainer extends Component {
  render() {
    console.log('ProjectsContainer().render() - this: ', this)

    return (
      <div className="ProjectsContainer">
        <p>
          Projects section
        </p>
        <CreateProject submitHandler={this.props.actions.addProject} />
      </div>
    );
  }
}

export default ProjectsContainer;
