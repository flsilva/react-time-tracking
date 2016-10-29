import React from 'react'
import AppBar from 'material-ui/AppBar'
import Logo from '../../common/logo/Logo'
import MainNav from '../nav/MainNav'

const AppHeader = (props) => (
  <div className="AppHeader">
    <AppBar
      iconElementLeft={<Logo />}
      iconElementRight={<MainNav user={props.user} />}
    />
  </div>
)

export default AppHeader
