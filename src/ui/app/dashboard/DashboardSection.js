import React from 'react'
import AppHeader from '../header/AppHeader'

const DashboardSection = (props) => (
  <div className="DashboardSection">
    <AppHeader title="Dashboard" user={props.user} />
    <p>
      Dashboard section
    </p>
    <div className="children">
      {props.children}
    </div>
  </div>
)

DashboardSection.propTypes = {
  user: React.PropTypes.object
}

export default DashboardSection
