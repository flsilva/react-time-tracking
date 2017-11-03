import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProject } from './StopwatchActions';
import ProjectDropDownContainer from '../projects/ProjectDropDownContainer';

class StopwatchProjectDropDownContainer extends Component {
  updateProject = (projectId) => {
    const { entity } = this.props;
    const { id } = entity;
    this.props.actions.updateProject({ id, projectId });
  }

  render() {
    const entity = this.props.entity || {};
    const projectId = entity.project ? entity.project.id : undefined;

    return (
      <ProjectDropDownContainer
        onItemPick={(attrName, value) => this.updateProject(value)}
        selectedItemId={projectId}
      />
    );
  }
}

StopwatchProjectDropDownContainer.propTypes = {
  actions: PropTypes.shape({
    updateProject: PropTypes.func.isRequired,
  }).isRequired,
  entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
};

StopwatchProjectDropDownContainer.defaultProps = {
  entity: undefined,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateProject }, dispatch),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(StopwatchProjectDropDownContainer);
