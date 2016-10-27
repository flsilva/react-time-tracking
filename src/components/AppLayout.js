import React from 'react'

const AppLayout = (props) => (
  <div className="AppLayout">
    <p>
      app header
    </p>
    <div class="AppSectionContainer">
      {props.children}
    </div>
    <p>
      app footer
    </p>
  </div>
)

export default AppLayout
