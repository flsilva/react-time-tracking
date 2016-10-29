import React from 'react'
import { connect } from 'react-redux'
import AppLayout from '../../ui/app/AppLayout'

const AppLayoutContainer = (props) => (
  <AppLayout {...props} />
)

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(AppLayoutContainer)
