import React from 'react';
import PropTypes from 'prop-types';
import ProjectDropdown from '../../presentation/projects/ProjectDropdown';

export default (navToNewEntity) => {
  function ProjectDropdownContainer(props) {
    const { entities, isConnecting, name, onItemPick, selectedItemId } = props;

    return (
      <ProjectDropdown
        isConnecting={isConnecting}
        name={name}
        onCreateProjectClick={navToNewEntity}
        onItemPick={onItemPick}
        projects={entities}
        selectedItemId={selectedItemId}
      />
    );
  }

  ProjectDropdownContainer.propTypes = {
    entities: PropTypes.arrayOf(PropTypes.object),
    isConnecting: PropTypes.bool,
    name: PropTypes.string,
    onItemPick: PropTypes.func.isRequired,
    selectedItemId: PropTypes.string,
  };

  ProjectDropdownContainer.defaultProps = {
    entities: undefined,
    isConnecting: false,
    name: undefined,
    selectedItemId: undefined,
  };

  return ProjectDropdownContainer;
};
