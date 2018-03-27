/*
 * @flow
 */

import type { ApiState, HttpQuery } from './api/types';
import type { QueryCache } from './api/caching/types';
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

export type CollectionWithQueryCache = {
  +entities: Collection,
  +queryCache: QueryCache
};

export type GetCollectionSelector = (
  state: AppState,
  query: HttpQuery
) => CollectionWithQueryCache | void;

export type GetCollectionSelectorFactory = (entityType: string) => GetCollectionSelector;

export type GetEntitySelector = (state: AppState, query: HttpQuery) => Entity | void;

export type GetEntitySelectorFactory = (entityType: string) => GetEntitySelector;

//-----------
// END ENTITY
//-----------
