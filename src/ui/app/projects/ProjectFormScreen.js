import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import ProjectForm from './ProjectForm';
import ArrowBackAppBar from '../header/ArrowBackAppBar';
import DoneIconButton from '../../common/DoneIconButton';
import MoreVertIconMenu from '../../common/MoreVertIconMenu';

const MENU_ITEM_DELETE = 'MENU_ITEM_DELETE';

const bodyStyles = {
  margin: '20px',
};

class ProjectFormScreen extends Component {
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
    const { isEditing, isConnecting, project } = this.props;
    const title = isEditing ? 'Edit Project' : 'New Project';

    return (
      <div>
        <ArrowBackAppBar title={title} onClickBackButton={this.backHandler}>
          <ToolbarGroup lastChild>
            <DoneIconButton onClick={this.submitHandler} disabled={isConnecting} />
            <MoreVertIconMenu onItemTouchTap={this.iconMenuItemClickHandler}>
              <MenuItem primaryText="Delete" value={MENU_ITEM_DELETE} />
            </MoreVertIconMenu>
          </ToolbarGroup>
        </ArrowBackAppBar>
        <div style={bodyStyles}>
          <ProjectForm
            ref={(node) => { this.projectForm = node; }}
            project={project}
            submitHandler={this.props.submitHandler}
          />
        </div>
      </div>
    );
  }
}

ProjectFormScreen.propTypes = {
  delete: PropTypes.func.isRequired,

  isEditing: PropTypes.bool,

  isConnecting: PropTypes.bool,

  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),

  submitHandler: PropTypes.func.isRequired,
};

ProjectFormScreen.defaultProps = {
  isEditing: false,
  isConnecting: false,
  project: null,
};

export default ProjectFormScreen;
