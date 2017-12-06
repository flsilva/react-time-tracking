import pipe from 'lodash/fp/pipe';
import withQuery from '../utils/withQuery';
import { generateQueryForRelationship } from '../utils/QueryUtils';
import CreateStopwatchScreenContainer from './StopwatchScreenContainer';
import CreateProjectDropDownContainer from './StopwatchProjectDropDownContainer';

// eslint-disable-next-line import/prefer-default-export
export const CreateEnhancedStopwatchScreen = (ProjectDropDown) => {
  const ScreenWithDropDown = CreateStopwatchScreenContainer(
    CreateProjectDropDownContainer(ProjectDropDown),
  );

  return pipe([
    withQuery(generateQueryForRelationship('project')),
  ])(ScreenWithDropDown);
};
