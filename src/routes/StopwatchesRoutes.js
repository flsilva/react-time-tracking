import { CreateProjectDropdown } from '../behavior/app/projects';
import { CreateEnhancedStopwatchScreen } from '../behavior/app/stopwatches';
import { navToNewEntity as navToNewProjectEntity } from './ProjectRoutes';

// eslint-disable-next-line import/prefer-default-export
export const StopwatchRoute = CreateEnhancedStopwatchScreen(
  CreateProjectDropdown({ navToNewEntity: navToNewProjectEntity }),
);
