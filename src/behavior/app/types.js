/*
 * @flow
 */

import type { HttpQuery, HttpResponseMeta } from './api/types';
import type { Database as ProjectDatabase, ProjectState } from './projects/types';

export type DatabaseState = { projects: ProjectDatabase };

export type AppState = { database: DatabaseState, projects: ProjectState };

//-------------
// BEGIN ENTITY
//-------------

export type EntityAttributes = { +name: string, +createdAt: string };

export type Entity = { +id: string, +attributes: EntityAttributes };

export type Collection = Array<Entity>;

export type CachedCollectionQuery = {
  +ids: Array<string>,
  +meta: HttpResponseMeta,
  +query: HttpQuery
};

export type CollectionWithQuery = {
  +entities: Collection,
  +cachedQuery: CachedCollectionQuery
};

export type GetCollectionSelector = (
  state: AppState,
  query: HttpQuery
) => CollectionWithQuery | void;

export type GetCollectionSelectorFactory = (entityType: string) => GetCollectionSelector;

export type GetEntitySelector = (state: AppState, query: HttpQuery) => Entity | void;

export type GetEntitySelectorFactory = (entityType: string) => GetEntitySelector;

//-----------
// END ENTITY
//-----------
