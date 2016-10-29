import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Layout = (props) => (
  <MuiThemeProvider>
    <div className="Layout">
      {props.children}
    </div>
  </MuiThemeProvider>
)

export default Layout
