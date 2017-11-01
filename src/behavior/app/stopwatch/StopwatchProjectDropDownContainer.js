import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setStopwatchProject } from './StopwatchActions';
import { getStopwatch } from './StopwatchState';
import ProjectDropDownContainer from '../projects/ProjectDropDownContainer';

class StopwatchProjectDropDownContainer extends Component {
  setStopwatchProject = (projectId) => {
    const { id } = this.props;
    this.props.actions.setStopwatchProject({ id, projectId });
  }

  render() {
    return (
      <ProjectDropDownContainer
        onItemPick={(attrName, value) => this.setStopwatchProject(value)}
        selectedItemId={this.props.projectId}
      />
    );
  }
}

StopwatchProjectDropDownContainer.propTypes = {
  actions: PropTypes.shape({
    setStopwatchProject: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string,
  projectId: PropTypes.string,
};

StopwatchProjectDropDownContainer.defaultProps = {
  id: undefined,
  projectId: undefined,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { id, project } = stopwatch;
  const projectId = project ? project.id : undefined;

  return {
    id,
    projectId,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setStopwatchProject }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchProjectDropDownContainer);
