/*
 * @flow
 */

import type { ApiState, HttpQuery } from './api/types';
import type { CachedQuery } from './api/caching/types';
import type { Database as ProjectDatabase, ProjectState } from './projects/types';

export type DatabaseState = { projects: ProjectDatabase };

export type AppState = {
  api: ApiState,
  database: DatabaseState,
  projects: ProjectState
};

//-------------
// BEGIN ENTITY
//-------------

export type EntityAttributes = { +name: string, +createdAt: string };

export type Entity = { +id: string, +attributes: EntityAttributes };

export type Collection = Array<Entity>;

export type CollectionWithCachedQuery = {
  +entities: Collection,
  +cachedQuery: CachedQuery
};

export type GetCollectionSelector = (
  state: AppState,
  query: HttpQuery
) => CollectionWithCachedQuery | void;

export type GetCollectionSelectorFactory = (entityType: string) => GetCollectionSelector;

export type GetEntitySelector = (state: AppState, query: HttpQuery) => Entity | void;

export type GetEntitySelectorFactory = (entityType: string) => GetEntitySelector;

//-----------
// END ENTITY
//-----------
