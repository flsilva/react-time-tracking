import React from 'react'
import AppBar from 'material-ui/AppBar'
import Logo from '../../common/logo/Logo'
import MainNav from '../nav/MainNav'

const WebsiteHeader = (props) => (
  <div className="WebsiteHeader">
    <AppBar
      iconElementRight={<MainNav user={props.user} />}
    />
  </div>
)

export default WebsiteHeader
