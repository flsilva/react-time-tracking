import React from 'react';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import DatePickerContainer from './DatePickerContainer';
import ProjectDropDownContainer from './ProjectDropDownContainer';
import DescriptionButtonContainer from './DescriptionButtonContainer';
import StopwatchFormButtonsContainer from './StopwatchFormButtonsContainer';

const StopwatchScreenBodyContainer = () => (
  <ScreenBody>
    <DatePickerContainer />
    <ProjectDropDownContainer />
    <DescriptionButtonContainer />
    <StopwatchFormButtonsContainer />
  </ScreenBody>
);

export default StopwatchScreenBodyContainer;
