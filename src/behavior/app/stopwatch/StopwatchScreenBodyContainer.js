import React from 'react';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import DatePickerContainer from './DatePickerContainer';
import ProjectDropDownContainer from './ProjectDropDownContainer';
import DescriptionButtonContainer from './DescriptionButtonContainer';
import StopwatchActionButtonsContainer from './StopwatchActionButtonsContainer';

const StopwatchScreenBodyContainer = () => (
  <ScreenBody>
    <DatePickerContainer />
    <ProjectDropDownContainer />
    <DescriptionButtonContainer />
    <StopwatchActionButtonsContainer />
  </ScreenBody>
);

export default StopwatchScreenBodyContainer;
