import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectActions from '../projects/Project.Actions'
import HomeSection from '../../components/home/HomeSection'

const mapStateToProps = state => ({
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSection)
