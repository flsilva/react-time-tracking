import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectActions from './Project.Actions'
import ProjectsSection from '../../components/projects/ProjectsSection'

const mapStateToProps = state => ({
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsSection)
