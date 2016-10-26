import React from 'react'
import ProjectListItem from './ProjectListItem'

const ProjectList = (props) => {
  const renderItem = ({id, name}) => {
    return (
      <ProjectListItem key={id}>
        {name}
      </ProjectListItem>
    )
  }

  return (
    <div className="ProjectList">
      {props.data ? props.data.map(renderItem) : null}
    </div>
  )
}

export default ProjectList
