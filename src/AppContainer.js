import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppComponent from './AppComponent'
import DashboardSection from './dashboard/DashboardSection'
import ProjectsSection from './projects/ProjectsSection'
import * as ProjectActions from './projects/Project.Actions'

/*
const AppContainer = ({projects, actions}) => (
  <AppComponent {...this.props} />
)
*/

class AppContainer extends Component {
  render() {
    console.log('AppContainer().render() - this: ', this);

    return (
      <AppComponent {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch)
})

const ConnectedAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

export const routes = {
  path: '/',
  component: ConnectedAppContainer,
  indexRoute: { component: DashboardSection },
  childRoutes: [
    { path: 'projects', component: ProjectsSection }
  ]
}

/*
export const routes = <Route path="/" component={ConnectedAppContainer}>
  <IndexRoute component={DashboardContainer}/>
  <Route path="/projects" component={ProjectsContainer}/>
</Route>
*/
