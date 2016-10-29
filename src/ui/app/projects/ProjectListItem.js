import React from 'react'

const ProjectListItem = (props) => (
  <div className="ProjectListItem">
    {props.children}
  </div>
)

ProjectListItem.propTypes = {
  children: React.PropTypes.string.isRequired
}

export default ProjectListItem
