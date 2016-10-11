import React from 'react'
import ProjectList from './ProjectList'
import ProjectForm from './ProjectForm'

const ProjectsSection = (props) => (
  <div className="ProjectsSection">
    <p>
      Projects section
    </p>
    <ProjectList data={props.projects} />
    <ProjectForm heading="New Project" submitHandler={props.actions.addProject} />
  </div>
)

export default ProjectsSection
