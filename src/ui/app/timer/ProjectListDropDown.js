import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

const createMenuItem = item => (
  <MenuItem value={item.id} key={item.id} primaryText={item.name} />
);

const getItems = items => (
  [{ id: '', name: 'Pick a project' }]
  .concat(items)
  .map(item => createMenuItem(item))
);

const ProjectListDropDown = props => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <FontIcon
      className="material-icons"
      style={{ color: '#3f2da5', marginRight: 20, marginTop: 2 }}
    >
      work
    </FontIcon>
    {props.projects &&
      <DropDownMenu
        maxHeight={200}
        value={props.selectedItem ? props.selectedItem : ''}
        onChange={(e, key, value) => props.itemPicked(value)}
        labelStyle={{ paddingLeft: 0 }}
        underlineStyle={{ display: 'none' }}
      >
        {getItems(props.projects)}
      </DropDownMenu>
    }
  </div>
);

ProjectListDropDown.propTypes = {
  itemPicked: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  selectedItem: PropTypes.string,
};

ProjectListDropDown.defaultProps = {
  projects: null,
  selectedItem: '',
};

export default ProjectListDropDown;
