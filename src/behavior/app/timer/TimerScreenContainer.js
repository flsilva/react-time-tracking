import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from '../projects/ProjectActions';
import TimerScreen from '../../../ui/app/timer/TimerScreen';

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProjectActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerScreen);
