import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProject } from './StopwatchActions';

export default (ProjectDropDown) => {
  function StopwatchProjectDropDownContainer(props) {
    const entity = props.entity || {};
    const id = entity.id;
    const currentProjectId = entity.project ? entity.project.id : undefined;

    const onItemPick = (projectId) => {
      props.updateProject({ id, projectId });
    };

    return (
      <ProjectDropDown
        onItemPick={(attrName, value) => onItemPick(value)}
        selectedItemId={currentProjectId}
      />
    );
  }

  StopwatchProjectDropDownContainer.propTypes = {
    updateProject: PropTypes.func.isRequired,
    entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
  };

  StopwatchProjectDropDownContainer.defaultProps = {
    entity: undefined,
  };

  const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateProject }, dispatch)
  );

  return connect(
    undefined,
    mapDispatchToProps,
  )(StopwatchProjectDropDownContainer);
};
