import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AddFAB from '../../../shared/presentation/button/AddFAB';
import ProjectList from '../../presentation/projects/ProjectList';
import Notifications from '../../presentation/utils/Notifications';
import SimpleAppBar from '../../presentation/header/SimpleAppBar';
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
