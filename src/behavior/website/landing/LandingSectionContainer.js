import { connect } from 'react-redux'
import LandingSection from '../../../ui/website/landing/LandingSection'

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(LandingSection)
