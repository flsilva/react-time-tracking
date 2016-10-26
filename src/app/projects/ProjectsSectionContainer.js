import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectActions from './Project.Actions'
import ProjectsSection from '../../components/projects/ProjectsSection'

class ProjectsSectionContainer extends Component {

  componentDidMount() {
    this.props.actions.getProjects()
  }

  render() {
    return (
      <ProjectsSection
        projects={this.props.projects.data}
        addProject={this.props.actions.addProject}
        error={this.props.projects.error}
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
