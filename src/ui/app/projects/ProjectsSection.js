import React from 'react'
import { browserHistory } from 'react-router'
import AppHeader from '../header/AppHeader'
import { Button } from 'react-toolbox/lib/button'
import ProjectList from './ProjectList'
import ErrorMessages from '../error/ErrorMessages'

const ProjectsSection = (props) => {
  const navToNewProject = () => {
    browserHistory.push('/app/projects/new')
  }

  return (
    <div className="ProjectsSection">
      <AppHeader title="Projects" user={props.user} />
      <ProjectList data={props.projects} />
      <Button icon='add' onMouseUp={navToNewProject} floating primary />
      <ErrorMessages error={props.error} />
    </div>
  )
}

ProjectsSection.propTypes = {
  user: React.PropTypes.object
}

export default ProjectsSection
