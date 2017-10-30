import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

const createMenuItem = item => (
  <MenuItem value={item.id} key={item.id} primaryText={item.name} />
);

const getItems = items => items.map(item => createMenuItem(item));

const ProjectListDropDown = (props) => {
  const {
    isConnecting,
    name,
    onCreateProjectClick,
    onItemPick,
    projects,
    selectedItemId,
  } = props;

  if (isConnecting) {
    return <CircularProgress color={'rgb(0, 188, 212)'} size={20} thickness={2} />;
  }

  if (projects && projects.length) {
    return (
      <DropDownMenu
        maxHeight={200}
        value={selectedItemId}
        onChange={(e, key, value) => onItemPick(name, value)}
        labelStyle={{ height: 48, lineHeight: '48px', paddingLeft: 0 }}
        underlineStyle={{ display: 'none' }}
        style={{ boxSizing: 'border-box', paddingTop: 2 }}
      >
        {getItems(projects)}
      </DropDownMenu>
    );
  }

  return (
    <FlatButton
      label="Create a Project"
      onClick={onCreateProjectClick}
    />
  );
};

ProjectListDropDown.propTypes = {
  name: PropTypes.string,
  isConnecting: PropTypes.bool,
  onCreateProjectClick: PropTypes.func.isRequired,
  onItemPick: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  selectedItemId: PropTypes.string,
};

ProjectListDropDown.defaultProps = {
  name: undefined,
  isConnecting: false,
  projects: undefined,
  selectedItemId: undefined,
};

export default ProjectListDropDown;
