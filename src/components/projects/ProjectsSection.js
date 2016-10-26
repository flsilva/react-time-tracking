import React from 'react'
import ProjectList from './ProjectList'
import ProjectForm from './ProjectForm'
import ErrorMessages from '../error/ErrorMessages'

const ProjectsSection = (props) => (
  <div className="ProjectsSection">
    <p>
      Projects section
    </p>
    <ProjectList data={props.projects} />
    <ProjectForm heading="New Project" submitHandler={props.addProject} />
    <ErrorMessages error={props.error} />
  </div>
)

export default ProjectsSection
