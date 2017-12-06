import React from 'react';
import PropTypes from 'prop-types';
import ProjectDropDown from '../../../ui/app/projects/ProjectDropDown';

export default (navToNewEntity) => {
  function ProjectDropDownContainer(props) {
    const { entities, isConnecting, name, onItemPick, selectedItemId } = props;

    return (
      <ProjectDropDown
        isConnecting={isConnecting}
        name={name}
        onCreateProjectClick={navToNewEntity}
        onItemPick={onItemPick}
        projects={entities}
        selectedItemId={selectedItemId}
      />
    );
  }

  ProjectDropDownContainer.propTypes = {
    entities: PropTypes.arrayOf(PropTypes.object),
    isConnecting: PropTypes.bool,
    name: PropTypes.string,
    onItemPick: PropTypes.func.isRequired,
    selectedItemId: PropTypes.string,
  };

  ProjectDropDownContainer.defaultProps = {
    entities: undefined,
    getQuery: undefined,
    isConnecting: false,
    name: undefined,
    selectedItemId: undefined,
  };

  return ProjectDropDownContainer;
};
