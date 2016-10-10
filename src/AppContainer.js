import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppComponent from './AppComponent'
import DashboardContainer from './dashboard/DashboardContainer'
import ProjectsContainer from './projects/ProjectsContainer'
import * as ProjectsActions from './projects/Projects.actions'

/*
const AppContainer = ({projects, actions}) => (
  <AppComponent {...this.props} />
)
*/

class AppContainer extends Component {
  test = e => {
    console.log('AppContainer().test()');
    this.props.actions.addProject('abcabc')
  }

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
  actions: bindActionCreators(ProjectsActions, dispatch)
})

const ConnectedAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

export const routes = {
  path: '/',
  component: ConnectedAppContainer,
  indexRoute: { component: DashboardContainer },
  childRoutes: [
    { path: 'projects', component: ProjectsContainer }
  ]
}

/*
export const routes = <Route path="/" component={ConnectedAppContainer}>
  <IndexRoute component={DashboardContainer}/>
  <Route path="/projects" component={ProjectsContainer}/>
</Route>
*/
