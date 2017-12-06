import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AddFAB from '../../../ui/common/button/AddFAB';
import ProjectList from '../../../ui/app/projects/ProjectList';
import Notifications from '../../../ui/app/utils/Notifications';
import SimpleAppBar from '../../../ui/app/header/SimpleAppBar';
import { getNotifications } from '../utils';

export default ({ navToEntity, navToNewEntity }) => {
  function ProjectListScreenContainer(props) {
    const { entities, error, hasNextPage, isConnecting, readNextPage } = props;

    const shouldDisplayLoadButton = () => hasNextPage && !isConnecting;

    return (
      <div>
        <SimpleAppBar title="Projects" />
        <ProjectList entities={entities} onClickProjectItem={navToEntity} />
        {!isConnecting &&
          <AddFAB onClick={navToNewEntity} />
        }
        {shouldDisplayLoadButton() &&
          <RaisedButton
            primary
            fullWidth
            disabled={isConnecting}
            style={{ marginTop: 20 }}
            label="Load More"
            onClick={readNextPage}
          />
        }
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }

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
