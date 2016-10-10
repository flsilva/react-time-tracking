import React, { Component } from 'react'
import ProjectListItem from './ProjectListItem'

class ProjectList extends Component {

  render() {
    const elements = this.props.data.map(function(project) {
      return (
        <ProjectListItem key={project.id}>
          {project.title}
        </ProjectListItem>
      );
    });

    return (
      <div className="ProjectList">
        {elements}
      </div>
    )
  }
}

export default ProjectList
