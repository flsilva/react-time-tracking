import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectActions from './ProjectActions'
import ProjectFormSection from '../../../ui/app/projects/ProjectFormSection'

class ProjectFormSectionContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

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

  componentDidMount() {
    const id = this.props.params.projectId
    this.getProject(id)
  }

  getProject(id) {
    console.log('ProjectFormSectionContainer::getProject() - this: ', this)

    if (!id) return

    this.setState({isFetching: true})
    console.log('ProjectFormSectionContainer().getProject() - this.state.isFetching: ', this.state.isFetching)

    this.props.actions.getProject(id).then(project => {
      console.log('ProjectFormSectionContainer().getProject().actions.getProject(id).then() - project: ', project)
      this.setState({
        project: project,
        isFetching: false
      })
    })
  }

  getSubmitHandler = () => {
    console.log('ProjectFormSectionContainer::getSubmitHandler() - this: ', this)

    return (this.state.project) ? this.updateProject : this.addProject 
  }

  render() {
    console.log('ProjectFormSectionContainer::render() - this.state.isFetching: ', this.state.isFetching)
    return (
      <ProjectFormSection
        submitHandler={this.getSubmitHandler()}
        error={this.props.projects.error}
        isFetching={this.state.isFetching}
        project={this.state.project}
        user={this.props.user}
      />
    )
  }

  updateProject = data => {
    const id = this.state.project.id

    return new Promise((resolve, reject) => {
      this.props.actions.updateProject(id, data)
        .then((data) => {
          console.log('ProjectFormSectionContainer::updateProject().then() - data: ', data)
          resolve(data)
          browserHistory.push('/app/projects')
        }).catch(function(error) {
          console.log('ProjectFormSectionContainer::updateProject().catch() - error: ', error)
          reject(error)
        })
    })
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
