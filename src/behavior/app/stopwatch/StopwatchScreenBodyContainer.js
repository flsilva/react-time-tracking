import React from 'react';
import CalendarIcon from 'material-ui/svg-icons/action/event';
import WorkIcon from 'material-ui/svg-icons/action/work';
import SheetIcon from 'material-ui/svg-icons/action/description';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import WithIcon from '../../../ui/app/common/WithIcon';
import DatePickerContainer from './DatePickerContainer';
import StopwatchProjectDropDownContainer from './StopwatchProjectDropDownContainer';
import DescriptionButtonContainer from './DescriptionButtonContainer';
import StopwatchFormButtonsContainer from './StopwatchFormButtonsContainer';

const StopwatchScreenBodyContainer = () => (
  <ScreenBody>
    <WithIcon icon={<CalendarIcon color={'#3f2da5'} />}>
      <DatePickerContainer />
    </WithIcon>
    <WithIcon icon={<WorkIcon color={'#3f2da5'} />}>
      <StopwatchProjectDropDownContainer />
    </WithIcon>
    <WithIcon icon={<SheetIcon color={'#3f2da5'} />}>
      <DescriptionButtonContainer />
    </WithIcon>
    <StopwatchFormButtonsContainer />
  </ScreenBody>
);

export default StopwatchScreenBodyContainer;
