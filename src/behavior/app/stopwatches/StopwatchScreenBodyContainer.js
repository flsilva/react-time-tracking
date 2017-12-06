import React from 'react';
import PropTypes from 'prop-types';
import CalendarIcon from 'material-ui/svg-icons/action/event';
import WorkIcon from 'material-ui/svg-icons/action/work';
import SheetIcon from 'material-ui/svg-icons/action/description';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import WithIcon from '../../../ui/app/common/WithIcon';
import withDialog from '../../../ui/common/withDialog';
import DatePickerContainer from './DatePickerContainer';
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
/*
const StopwatchProjectDropDownContainerWithQuery = props => (
  <StopwatchProjectDropDownContainer
    {...props}
    getQuery={generateQueryForRelationship('author')}
  />
);
*/

export default (ProjectDropDown) => {
  const StopwatchScreenBodyContainer = ({ entity }, { muiTheme: { palette } }) => {
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
        <WithIcon icon={<CalendarIcon color={palette.accent1Color} />}>
          <DatePickerContainer entity={entity} />
        </WithIcon>
        <WithIcon icon={<WorkIcon color={palette.accent1Color} />}>
          <ProjectDropDown entity={entity} />
        </WithIcon>
        <WithIcon icon={<SheetIcon color={palette.accent1Color} />}>
          <DescriptionButtonContainerWithDialog entity={entity} />
        </WithIcon>
        <StopwatchFormButtonsContainer entity={entity} />
      </ScreenBody>
    );
  };

  StopwatchScreenBodyContainer.contextTypes = {
    muiTheme: PropTypes.shape({
      palette: PropTypes.object,
    }),
  };

  StopwatchScreenBodyContainer.propTypes = {
    entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
  };

  StopwatchScreenBodyContainer.defaultProps = {
    entity: undefined,
  };

  return StopwatchScreenBodyContainer;
};
