import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AddFAB from '../../../ui/common/button/AddFAB';
import ProjectList from '../../../ui/app/projects/ProjectList';
import Notifications from '../../../ui/app/utils/Notifications';
import SimpleAppBar from '../../../ui/app/header/SimpleAppBar';
import { getNotifications } from '../utils';

export default ({ navToEntity, navToNewEntity }) => {
  class ProjectListScreenContainer extends Component {
    componentDidMount() {
      this.props.readNextPage();
    }

    shouldDisplayLoadButton = () => {
      const { hasNextPage, isConnecting } = this.props;
      return hasNextPage && !isConnecting;
    };

    render() {
      const { entities, error, isConnecting } = this.props;

      return (
        <div>
          <SimpleAppBar title="Projects" />
          <ProjectList entities={entities} onClickProjectItem={navToEntity} />
          {!isConnecting &&
            <AddFAB onClick={navToNewEntity} />
          }
          {this.shouldDisplayLoadButton() &&
            <RaisedButton
              primary
              fullWidth
              disabled={isConnecting}
              style={{ marginTop: 20 }}
              label="Load More"
              onClick={this.props.readNextPage}
            />
          }
          <Notifications notifications={getNotifications(error, isConnecting)} />
        </div>
      );
    }
  }

  ProjectListScreenContainer.contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  ProjectListScreenContainer.propTypes = {
    entities: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.arrayOf(PropTypes.object),
    hasNextPage: PropTypes.bool,
    isConnecting: PropTypes.bool,
    readNextPage: PropTypes.func.isRequired,
  };

  ProjectListScreenContainer.defaultProps = {
    entities: undefined,
    error: undefined,
    hasNextPage: undefined,
    isConnecting: undefined,
  };

  return ProjectListScreenContainer;
};
