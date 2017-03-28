import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectActions from './ProjectActions'
import ProjectsSection from '../../../ui/app/projects/ProjectsSection'

class ProjectsSectionContainer extends Component {

  componentDidMount() {
    this.props.actions.getProjects()
  }

  render() {
    return (
      <ProjectsSection
        addProject={this.props.actions.addProject}
        error={this.props.projects.error}
        projects={this.props.projects.data}
        user={this.props.user}
      />
    )
  }

}

const mapStateToProps = state => ({
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsSectionContainer)
