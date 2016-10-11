import React from 'react'
import ProjectListItem from './ProjectListItem'

const ProjectList = (props) => {
  const renderItem = ({id, title}) => {
    return (
      <ProjectListItem key={id}>
        {title}
      </ProjectListItem>
    )
  }

  return (
    <div className="ProjectList">
      {props.data.map(renderItem)}
    </div>
  )
}

export default ProjectList
