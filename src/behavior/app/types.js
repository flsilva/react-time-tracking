/*
 * @flow
 */

import type { Database as ProjectDatabase, ProjectState } from './projects/types';

export type DatabaseState = { projects: ProjectDatabase };

export type AppState = { database: DatabaseState, projects: ProjectState };
