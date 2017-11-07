import React from 'react';
import PropTypes from 'prop-types';
import CalendarIcon from 'material-ui/svg-icons/action/event';
import WorkIcon from 'material-ui/svg-icons/action/work';
import SheetIcon from 'material-ui/svg-icons/action/description';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import WithIcon from '../../../ui/app/common/WithIcon';
import withDialog from '../../../ui/common/withDialog';
import { generateQueryForRelationship } from '../utils/QueryUtils';
import DatePickerContainer from './DatePickerContainer';
import StopwatchProjectDropDownContainer from './StopwatchProjectDropDownContainer';
import DescriptionButtonContainer from './DescriptionButtonContainer';
import StopwatchFormButtonsContainer from './StopwatchFormButtonsContainer';
import DescriptionFormDialogContainer from './DescriptionFormDialogContainer';

/*
 * Although we don't need the "author" relationship object
 * into projects entities for the dropdown feature in the stopwatch screen,
 * we include it here as a cache strategy regarding overall app performance.
 * That way when we navigate between stopwatch and project listing
 * screens only one http request is needed.
 */
const StopwatchProjectDropDownContainerWithQuery = props => (
  <StopwatchProjectDropDownContainer
    {...props}
    getQuery={generateQueryForRelationship('author')}
  />
);

const StopwatchScreenBodyContainer = ({ entity }) => {
  const description = entity ? entity.description : undefined;

  const DescriptionButtonContainerWithData = props => (
    <DescriptionButtonContainer description={description} {...props} />
  );

  const DescriptionFormDialogContainerWithEntity = props => (
    <DescriptionFormDialogContainer entity={entity} {...props} />
  );

  const DescriptionButtonContainerWithDialog = withDialog(
    DescriptionButtonContainerWithData,
    DescriptionFormDialogContainerWithEntity,
  );

  return (
    <ScreenBody>
      <WithIcon icon={<CalendarIcon color={'#3f2da5'} />}>
        <DatePickerContainer entity={entity} />
      </WithIcon>
      <WithIcon icon={<WorkIcon color={'#3f2da5'} />}>
        <StopwatchProjectDropDownContainerWithQuery entity={entity} />
      </WithIcon>
      <WithIcon icon={<SheetIcon color={'#3f2da5'} />}>
        <DescriptionButtonContainerWithDialog entity={entity} />
      </WithIcon>
      <StopwatchFormButtonsContainer entity={entity} />
    </ScreenBody>
  );
};

StopwatchScreenBodyContainer.propTypes = {
  entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
};

StopwatchScreenBodyContainer.defaultProps = {
  entity: undefined,
};

export default StopwatchScreenBodyContainer;
