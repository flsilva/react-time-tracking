import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';

const createMenuItem = item => (
  <MenuItem value={item.id} key={item.id} primaryText={item.name} />
);

const getItems = items => items.map(item => createMenuItem(item));

const contentToShow = (props) => {
  let content;

  if (props.isConnecting) {
    content = <CircularProgress color={'rgb(0, 188, 212)'} size={20} thickness={2} />;
  } else if (props.projects && props.projects.length) {
    content = (
      <DropDownMenu
        maxHeight={200}
        value={props.selectedItem ? props.selectedItem : ''}
        onChange={(e, key, value) => props.itemPicked(value)}
        labelStyle={{ paddingLeft: 0 }}
        underlineStyle={{ display: 'none' }}
      >
        {getItems(props.projects)}
      </DropDownMenu>
    );
  } else {
    content = (
      <FlatButton
        label="Create a Project"
        onClick={props.createProjectClickHandler}
      />
    );
  }

  return content;
};

const ProjectListDropDown = props => (
  <div style={{ display: 'flex', alignItems: 'center', height: 48 }}>
    <FontIcon
      className="material-icons"
      style={{ color: '#3f2da5', marginRight: 20, marginTop: 2 }}
    >
      work
    </FontIcon>
    {contentToShow(props)}
  </div>
);

ProjectListDropDown.propTypes = {
  isConnecting: PropTypes.bool,
  itemPicked: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  selectedItem: PropTypes.string,
};

ProjectListDropDown.defaultProps = {
  isConnecting: false,
  projects: null,
  selectedItem: '',
};

export default ProjectListDropDown;
