import React from 'react'
import { List, ListItem } from 'react-toolbox/lib/list'
import ProjectListItem from './ProjectListItem'

const ProjectList = (props) => {
  const renderItem = ({id, name}) => {

    return (
      <ListItem
        caption={name}
        key={id}
        leftIcon='folder'
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
