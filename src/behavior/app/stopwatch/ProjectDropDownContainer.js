import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { readEntities, QUERY_ALL } from '../projects/ProjectActions';
import { readEntitiesByQueries } from '../projects/ProjectReducers';
import { setActivityProject } from './StopwatchActions';
import { getStopwatch } from './StopwatchReducers';
import ProjectDropDown from '../../../ui/app/stopwatch/ProjectDropDown';

class ProjectDropDownContainer extends Component {

  componentDidMount() {
    this.props.actions.readEntities(QUERY_ALL);
  }

  render() {
    return (
      <ProjectDropDown
        isConnecting={this.props.isConnecting}
        onCreateProjectClick={() => browserHistory.push('/app/projects/new')}
        onItemPick={this.props.actions.setActivityProject}
        projects={this.props.data}
        selectedItem={this.props.projectId}
      />
    );
  }
}

ProjectDropDownContainer.propTypes = {
  actions: PropTypes.shape({
    readEntities: PropTypes.func.isRequired,
    setActivityProject: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  isConnecting: PropTypes.bool,
  projectId: PropTypes.string,
};

ProjectDropDownContainer.defaultProps = {
  data: null,
  isConnecting: false,
  projectId: null,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { activityDate } = stopwatch;
  const projectId = stopwatch.project ? stopwatch.project.id : null;

  return {
    activityDate,
    data: readEntitiesByQueries(state, [QUERY_ALL]),
    isConnecting: state.projects.isConnecting,
    projectId,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ readEntities, setActivityProject }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDropDownContainer);
