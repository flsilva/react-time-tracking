import { ProjectDropdownFactory } from '../application/projects';
import { CreateEnhancedStopwatchScreen } from '../application/stopwatches';
import { navToNewEntity as navToNewProjectEntity } from './ProjectRoutes';

// eslint-disable-next-line import/prefer-default-export
export const StopwatchRoute = CreateEnhancedStopwatchScreen(
  ProjectDropdownFactory({ navToNewEntity: navToNewProjectEntity }),
);
