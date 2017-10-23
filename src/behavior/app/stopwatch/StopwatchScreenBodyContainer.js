import React from 'react';
import CalendarIcon from 'material-ui/svg-icons/action/event';
import WorkIcon from 'material-ui/svg-icons/action/work';
import SheetIcon from 'material-ui/svg-icons/action/description';
import ScreenBody from '../../../ui/app/common/ScreenBody';
import withIcon from '../../../ui/app/common/withIcon';
import DatePickerContainer from './DatePickerContainer';
import StopwatchProjectDropDownContainer from './StopwatchProjectDropDownContainer';
import DescriptionButtonContainer from './DescriptionButtonContainer';
import StopwatchFormButtonsContainer from './StopwatchFormButtonsContainer';

const DatePickerIcon = () => <CalendarIcon color={'#3f2da5'} />;
const DatePickerWithIcon = withIcon(DatePickerContainer, DatePickerIcon);

const ProjectIcon = () => <WorkIcon color={'#3f2da5'} />;
const ProjectDropDownWithIcon = withIcon(StopwatchProjectDropDownContainer, ProjectIcon);

const DescriptionIcon = () => <SheetIcon color={'#3f2da5'} />;
const DescriptionButtonWithIcon = withIcon(DescriptionButtonContainer, DescriptionIcon);

const StopwatchScreenBodyContainer = () => (
  <ScreenBody>
    <DatePickerWithIcon />
    <ProjectDropDownWithIcon />
    <DescriptionButtonWithIcon />
    <StopwatchFormButtonsContainer />
  </ScreenBody>
);

export default StopwatchScreenBodyContainer;
