import React from 'react'
import AppHeader from '../header/AppHeader'
import { Button } from 'react-toolbox/lib/button'
import ProjectList from './ProjectList'
import ProjectForm from './ProjectForm'
import ErrorMessages from '../error/ErrorMessages'

const ProjectsSection = (props) => (
  <div className="ProjectsSection">
    <AppHeader title="Projects" user={props.user} />
    <ProjectList data={props.projects} />
    <Button icon='add' floating primary />
    <ErrorMessages error={props.error} />
  </div>
)

ProjectsSection.propTypes = {
  user: React.PropTypes.object
}

export default ProjectsSection
