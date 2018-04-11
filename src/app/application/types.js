/*
 * @flow
 */

import type { NetState } from './shared/net/Types';
import type { ProjectState } from './projects/types';

export type AppState = {
  +net: NetState,
  +projects: ProjectState
};
