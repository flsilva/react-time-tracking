import React from 'react'

const AppLayout = (props) => (
  <div className="AppLayout">
    <div className="SectionContainer">
      {props.children}
    </div>
  </div>
)

export default AppLayout
