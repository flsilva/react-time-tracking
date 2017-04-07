import React from 'react'
import { browserHistory } from 'react-router'
import { List, ListItem } from 'react-toolbox/lib/list'

const ProjectList = (props) => {
  const navigateToProject = (id) => {
    browserHistory.push('/app/projects/' + id)
  }

  const renderItem = ({id, name}) => {
    return (
      <ListItem
        caption={name}
        key={id}
        leftIcon='folder'
        onClick={() => navigateToProject(id)}
        rightIcon='star'
      />
    )
  }

  return (
    <List selectable ripple>
      {props.data ? props.data.map(renderItem) : null}
    </List>
  )
}

export default ProjectList
