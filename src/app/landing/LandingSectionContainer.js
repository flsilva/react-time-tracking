import React from 'react'
import { connect } from 'react-redux'
import * as ProjectActions from '../projects/Project.Actions'
import WebsiteLayout from '../../components/WebsiteLayout'
import LandingSection from '../../components/landing/LandingSection'

/*const LandingSectionContainer = (props) => (
  <WebsiteLayout>
    <LandingSection />
  </WebsiteLayout>
)*/

const LandingSectionContainer = (props) => (
  <LandingSection {...props} />
)

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(LandingSectionContainer)
