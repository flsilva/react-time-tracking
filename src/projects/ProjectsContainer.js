import React, { Component } from 'react';
import CreateProject from './CreateProject';

class ProjectsContainer extends Component {
  render() {
    return (
      <div className="ProjectsContainer">
        <p>
          Projects section
        </p>
        <CreateProject/>
      </div>
    );
  }
}

export default ProjectsContainer;
