import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectActions from './ProjectActions'
import ProjectFormSection from '../../../ui/app/projects/ProjectFormSection'

class ProjectFormSectionContainer extends Component {

  addProject = data => {
    return new Promise((resolve, reject) => {
      this.props.actions.addProject(data)
        .then((data) => {
          console.log('ProjectFormSectionContainer::addProject().then() - data: ', data)
          resolve(data)
          browserHistory.push('/app/projects')
        }).catch(function(error) {
          console.log('ProjectFormSectionContainer::addProject().catch() - error: ', error)
          reject(error)
        })
    })
  }

  render() {
    return (
      <ProjectFormSection
        submitHandler={this.addProject}
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
)(ProjectFormSectionContainer)
