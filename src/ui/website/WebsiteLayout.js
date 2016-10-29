import React from 'react'
import WebsiteHeader from './header/WebsiteHeader'

const WebsiteLayout = (props) => (
  <div className="WebsiteLayout">
    <WebsiteHeader user={props.auth.user} />
    <div className="SectionContainer">
      {props.children}
    </div>
    <p>
      website footer
    </p>
  </div>
)

export default WebsiteLayout
