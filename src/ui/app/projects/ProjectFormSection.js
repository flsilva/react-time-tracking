import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon';
import ProjectForm from './ProjectForm';

const MENU_ITEM_DELETE = 'MENU_ITEM_DELETE';

const bodyStyles = {
  margin: '20px',
};

class ProjectFormSection extends Component {
  backHandler = () => {
    browserHistory.goBack();
  }

  submitHandler = () => {
    this.projectForm.saveHandler();
  }

  iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === MENU_ITEM_DELETE) {
      this.props.delete(this.props.project.id);
    }
  }

  render() {
    const { isEditing, isFetching, project } = this.props;
    const title = isEditing ? 'Edit Project' : 'New Project';
    const { palette } = this.context.muiTheme;
    const toolbarStyles = {
      backgroundColor: palette.primary1Color,
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    };

    return (
      <div className="ProjectFormSection">
        <Toolbar style={toolbarStyles}>
          <ToolbarGroup firstChild>
            <IconButton onClick={this.backHandler}>
              <FontIcon className="material-icons" color={palette.alternateTextColor}>arrow_back</FontIcon>
            </IconButton>
            <ToolbarTitle text={title} style={{ color: palette.alternateTextColor }} />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <IconButton onClick={this.submitHandler} disabled={isFetching}>
              <FontIcon className="material-icons" color={palette.alternateTextColor}>done</FontIcon>
            </IconButton>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              iconStyle={{ color: palette.alternateTextColor }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              onItemTouchTap={this.iconMenuItemClickHandler}
            >
              <MenuItem primaryText="Delete" value={MENU_ITEM_DELETE} />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <div style={bodyStyles}>
          <ProjectForm
            ref={(node) => { this.projectForm = node; }}
            isFetching={isFetching}
            project={project}
            submitHandler={this.props.submitHandler}
          />
        </div>
      </div>
    );
  }
}

ProjectFormSection.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

ProjectFormSection.propTypes = {
  delete: PropTypes.func.isRequired,

  isEditing: PropTypes.bool,

  isFetching: PropTypes.bool,

  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),

  submitHandler: PropTypes.func.isRequired,
};

ProjectFormSection.defaultProps = {
  isEditing: false,
  isFetching: false,
  project: null,
};

export default ProjectFormSection;
