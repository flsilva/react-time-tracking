import React, { Component } from 'react'

class ProjectListItem extends Component {

  render() {
    return (
      <div className="ProjectListItem">
        {this.props.children}
      </div>
    )
  }
}

export default ProjectListItem
