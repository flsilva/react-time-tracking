import React from 'react'
import AppHeader from './header/AppHeader'

const AppLayout = (props) => (
  <div className="AppLayout">
    <AppHeader user={props.auth.user} />
    <div className="SectionContainer">
      {props.children}
    </div>
    <p>
      app footer
    </p>
  </div>
)

export default AppLayout
