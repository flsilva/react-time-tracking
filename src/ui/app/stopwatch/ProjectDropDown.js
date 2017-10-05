import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import IconFieldWrap from '../common/IconFieldWrap';

const createMenuItem = item => (
  <MenuItem value={item.id} key={item.id} primaryText={item.name} />
);

const getItems = items => items.map(item => createMenuItem(item));

const ProjectListDropDown = (props) => {
  let content;

  if (props.isConnecting) {
    content = <CircularProgress color={'rgb(0, 188, 212)'} size={20} thickness={2} />;
  } else if (props.projects && props.projects.length) {
    content = (
      <DropDownMenu
        maxHeight={200}
        value={props.selectedItem ? props.selectedItem : ''}
        onChange={(e, key, value) => props.onItemPick(value)}
        labelStyle={{ height: 48, lineHeight: '48px', paddingLeft: 0 }}
        underlineStyle={{ display: 'none' }}
        style={{ boxSizing: 'border-box', paddingTop: 2 }}
      >
        {getItems(props.projects)}
      </DropDownMenu>
    );
  } else {
    content = (
      <FlatButton
        label="Create a Project"
        onClick={props.onCreateProjectClick}
      />
    );
  }

  const Icon = (
    <FontIcon
      className="material-icons"
      style={{ color: '#3f2da5' }}
    >
      work
    </FontIcon>
  );

  return (
    <IconFieldWrap icon={Icon}>
      {content}
    </IconFieldWrap>
  );
};

ProjectListDropDown.propTypes = {
  onCreateProjectClick: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool,
  onItemPick: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  selectedItem: PropTypes.string,
};

ProjectListDropDown.defaultProps = {
  isConnecting: false,
  projects: null,
  selectedItem: '',
};

export default ProjectListDropDown;
