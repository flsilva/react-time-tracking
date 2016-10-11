import React from 'react'
import App from './App'
import DashboardSectionContainer from './dashboard/DashboardSectionContainer'
import ProjectsSectionContainer from './projects/ProjectsSectionContainer'

const AppContainer = (props) => (
  <App {...props} />
)

export const routes = {
  path: '/',
  component: AppContainer,
  indexRoute: { component: DashboardSectionContainer },
  childRoutes: [
    { path: 'projects', component: ProjectsSectionContainer }
  ]
}
