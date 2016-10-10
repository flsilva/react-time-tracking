import React, { Component } from 'react'
import ProjectListItem from './ProjectListItem'

class ProjectList extends Component {

  render() {
    return (
      <div className="ProjectList">
        {this.props.data.map(this.renderItem)}
      </div>
    )
  }

  renderItem({id, title}) {
    return (
      <ProjectListItem key={id}>
        {title}
      </ProjectListItem>
    )
  }
}

export default ProjectList
