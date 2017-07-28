import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from '../projects/ProjectActions';
import DashboardSection from '../../../ui/app/dashboard/DashboardSection';

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardSection);
