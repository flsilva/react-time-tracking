import React from 'react'

const WebsiteLayout = (props) => (
  <div className="WebsiteLayout">
    <p>
      website header
    </p>
    <div>
      {props.children}
    </div>
    <p>
      website footer
    </p>
  </div>
)

export default WebsiteLayout
