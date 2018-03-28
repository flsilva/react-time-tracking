/*
 * @flow
 */

import type { NetState } from './shared/net/Types';
import type { HttpQuery } from './shared/net/http/Types';
import type { QueryMetaResult } from './shared/net/http/caching/Types';
import type {
  Database as ProjectDatabase,
  DatabaseAction as ProjectDatabaseAction,
  ProjectState,
} from './projects/types';

export type DatabaseState = { +projects?: ProjectDatabase };

export type AppState = {
  database: DatabaseState,
  net: NetState,
  projects: ProjectState
};

export type DatabaseAction =
  | ProjectDatabaseAction;

//-------------
// BEGIN ENTITY
//-------------

export type EntityAttributes = { +name: string, +createdAt: string };

export type Entity = { +id: string, +attributes: EntityAttributes };

export type Collection = Array<Entity>;

export type CollectionWithQueryMetaResult = {
  +entities: Collection,
  +queryMetaResult: QueryMetaResult
};

export type GetCollectionSelector = (
  state: AppState,
  query: HttpQuery
) => CollectionWithQueryMetaResult | void;

export type GetCollectionSelectorFactory = (entityType: string) => GetCollectionSelector;

export type GetEntitySelector = (state: AppState, query: HttpQuery) => Entity | void;

export type GetEntitySelectorFactory = (entityType: string) => GetEntitySelector;

//-----------
// END ENTITY
//-----------
