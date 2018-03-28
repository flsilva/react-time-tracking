/*
 * @flow
 */

import type { AppState } from '../types';
import type {
  ApiErrors,
  HttpQuery,
  HttpRequest,
  HttpResponseWithQuery,
} from '../api/types';

//-------------
// BEGIN ENTITY
//-------------

export type EntityAttributes = { +name: string, +createdAt: string };
export type Entity = { +id: string, +attributes: EntityAttributes };
export type Collection = Array<Entity>;

//-----------
// END ENTITY
//-----------

//----------------------
// BEGIN ENTITY DATABASE
//----------------------

export const CLEAR_DATABASE: 'app/projects/clear/database' =
  'app/projects/clear/database';
export const UPDATE_DATABASE: 'app/projects/update/database' =
  'app/projects/update/database';

export type Database = { +[entityId: string]: Entity };

export type ClearDatabaseAction = { +type: typeof CLEAR_DATABASE };
export type ClearDatabaseActionCreator = () => ClearDatabaseAction;

export type UpdateDatabaseAction = { +type: typeof UPDATE_DATABASE, +payload: Database };
export type UpdateDatabaseActionCreator = (payload: Database) => UpdateDatabaseAction;

export type DatabaseAction =
  | ClearDatabaseAction
  | UpdateDatabaseAction;

export type DatabaseReducer = (state: Database, action: DatabaseAction) => Database;

//--------------------
// END ENTITY DATABASE
//--------------------

//-----------
// BEGIN HTTP
//-----------

type HttpRequestWrapper = { +http: HttpRequest };

//---------
// END HTTP
//---------

//--------------------
// BEGIN CREATE ENTITY
//--------------------

export const CREATE_ENTITY_REQUESTED: 'app/projects/create/entity/requested' =
  'app/projects/create/entity/requested';
export const CREATE_ENTITY_STARTED: 'app/projects/create/entity/started' =
  'app/projects/create/entity/started';
export const CREATE_ENTITY_SUCCEEDED: 'app/projects/create/entity/succeeded' =
  'app/projects/create/entity/succeeded';
export const CREATE_ENTITY_FAILED: 'app/projects/create/entity/failed' =
  'app/projects/create/entity/failed';

export type CreateEntityPayload = { +name: string };

export type CreateEntityRequestedAction = {
  +type: typeof CREATE_ENTITY_REQUESTED,
  +meta: HttpRequestWrapper
};

export type CreateEntityRequestedActionCreator = (
  data: CreateEntityPayload,
  successCb?: () => mixed,
) => CreateEntityRequestedAction;

export type CreateEntityStartedAction = { +type: typeof CREATE_ENTITY_STARTED };
export type CreateEntityStartedActionCreator = () => CreateEntityStartedAction;

export type CreateEntitySucceededAction = {
  +type: typeof CREATE_ENTITY_SUCCEEDED,
  +payload: Entity
};
export type CreateEntitySucceededActionCreator = (payload: Entity) => CreateEntitySucceededAction;

export type CreateEntityFailedAction = {
  +type: typeof CREATE_ENTITY_FAILED,
  +payload: ApiErrors
};
export type CreateEntityFailedActionCreator = (payload: ApiErrors) => CreateEntityFailedAction;

export type CreateEntityAction =
  | CreateEntityRequestedAction
  | CreateEntityStartedAction
  | CreateEntitySucceededAction
  | CreateEntityFailedAction;

//------------------
// END CREATE ENTITY
//------------------

//------------------
// BEGIN READ ENTITY
//------------------

export const READ_ENTITY_REQUESTED: 'app/projects/read/entity/requested' =
  'app/projects/read/entity/requested';
export const READ_ENTITY_STARTED: 'app/projects/read/entity/started' =
  'app/projects/read/entity/started';
export const READ_ENTITY_SUCCEEDED: 'app/projects/read/entity/succeeded' =
  'app/projects/read/entity/succeeded';
export const READ_ENTITY_FAILED: 'app/projects/read/entity/failed' =
  'app/projects/read/entity/failed';

export type ReadEntityRequestedAction = {
  +type: typeof READ_ENTITY_REQUESTED,
  +meta: HttpRequestWrapper
};

export type ReadEntityRequestedActionCreator = (
  query: HttpQuery,
  killCache?: boolean
) => ReadEntityRequestedAction;

export type ReadEntityStartedAction = { +type: typeof READ_ENTITY_STARTED };
export type ReadEntityStartedActionCreator = () => ReadEntityStartedAction;

export type ReadEntitySucceededAction = {
  +type: typeof READ_ENTITY_SUCCEEDED,
  +payload: HttpResponseWithQuery<Entity>
};
export type ReadEntitySucceededActionCreator = (
  payload: HttpResponseWithQuery<Entity>
) => ReadEntitySucceededAction;

export type ReadEntityFailedAction = {
  +type: typeof READ_ENTITY_FAILED,
  +payload: ApiErrors
};
export type ReadEntityFailedActionCreator = (payload: ApiErrors) => ReadEntityFailedAction;

export type ReadEntityAction =
  | ReadEntityRequestedAction
  | ReadEntityStartedAction
  | ReadEntitySucceededAction
  | ReadEntityFailedAction;

//----------------
// END READ ENTITY
//----------------

//----------------------
// BEGIN READ COLLECTION
//----------------------

export const READ_COLLECTION_REQUESTED: 'app/projects/read/collection/requested' =
  'app/projects/read/collection/requested';
export const READ_COLLECTION_STARTED: 'app/projects/read/collection/started' =
  'app/projects/read/collection/started';
export const READ_COLLECTION_SUCCEEDED: 'app/projects/read/collection/succeeded' =
  'app/projects/read/collection/succeeded';
export const READ_COLLECTION_FAILED: 'app/projects/read/collection/failed' =
  'app/projects/read/collection/failed';

export type ReadCollectionRequestedAction = {
  +type: typeof READ_COLLECTION_REQUESTED,
  +meta: HttpRequestWrapper
};
export type ReadCollectionRequestedActionCreator = (
  query?: HttpQuery,
  killCache?: boolean
) => ReadCollectionRequestedAction;

export type ReadCollectionStartedAction = { +type: typeof READ_COLLECTION_STARTED };
export type ReadCollectionStartedActionCreator = () => ReadCollectionStartedAction;

export type ReadCollectionSucceededAction = {
  +type: typeof READ_COLLECTION_SUCCEEDED,
  +payload: HttpResponseWithQuery<Collection>
};

export type ReadCollectionSucceededActionCreator = (
  payload: HttpResponseWithQuery<Collection>
) => ReadCollectionSucceededAction;

export type ReadCollectionFailedAction = {
  +type: typeof READ_COLLECTION_FAILED,
  +payload: ApiErrors
};
export type ReadCollectionFailedActionCreator = (
  payload: ApiErrors
) => ReadCollectionFailedAction;

export type ReadCollectionAction =
  | ReadCollectionRequestedAction
  | ReadCollectionStartedAction
  | ReadCollectionSucceededAction
  | ReadCollectionFailedAction;

//--------------------
// END READ COLLECTION
//--------------------

//--------------------
// BEGIN UPDATE ENTITY
//--------------------

export const UPDATE_ENTITY_REQUESTED: 'app/projects/update/entity/requested' =
  'app/projects/update/entity/requested';
export const UPDATE_ENTITY_STARTED: 'app/projects/update/entity/started' =
  'app/projects/update/entity/started';
export const UPDATE_ENTITY_SUCCEEDED: 'app/projects/update/entity/succeeded' =
  'app/projects/update/entity/succeeded';
export const UPDATE_ENTITY_FAILED: 'app/projects/update/entity/failed' =
  'app/projects/update/entity/failed';

export type UpdateEntityPayload = { +id: string, +name?: string };

export type UpdateEntityRequestedAction = {
  +type: typeof UPDATE_ENTITY_REQUESTED,
  +meta: HttpRequestWrapper
};
export type UpdateEntityRequestedActionCreator = (
  data: UpdateEntityPayload,
  successCb?: () => mixed,
) => UpdateEntityRequestedAction;

export type UpdateEntityStartedAction = { +type: typeof UPDATE_ENTITY_STARTED };
export type UpdateEntityStartedActionCreator = () => UpdateEntityStartedAction;

export type UpdateEntitySucceededAction = {
  +type: typeof UPDATE_ENTITY_SUCCEEDED,
  +payload: Entity
};
export type UpdateEntitySucceededActionCreator = (payload: Entity) => UpdateEntitySucceededAction;

export type UpdateEntityFailedAction = {
  +type: typeof UPDATE_ENTITY_FAILED,
  +payload: ApiErrors
};
export type UpdateEntityFailedActionCreator = (payload: ApiErrors) => UpdateEntityFailedAction;

export type UpdateEntityAction =
  | UpdateEntityRequestedAction
  | UpdateEntityStartedAction
  | UpdateEntitySucceededAction
  | UpdateEntityFailedAction;

//------------------
// END UPDATE ENTITY
//------------------

//--------------------
// BEGIN DELETE ENTITY
//--------------------

export const DELETE_ENTITY_REQUESTED: 'app/projects/delete/entity/requested' =
'app/projects/delete/entity/requested';
export const DELETE_ENTITY_STARTED: 'app/projects/delete/entity/started' =
  'app/projects/delete/entity/started';
export const DELETE_ENTITY_SUCCEEDED: 'app/projects/delete/entity/succeeded' =
  'app/projects/delete/entity/succeeded';
export const DELETE_ENTITY_FAILED: 'app/projects/delete/entity/failed' =
  'app/projects/delete/entity/failed';

export type DeleteEntityRequestedAction = {
  +type: typeof DELETE_ENTITY_REQUESTED,
  +meta: HttpRequestWrapper
};
export type DeleteEntityRequestedActionCreator = (
  id: string,
  successCb?: () => mixed,
) => DeleteEntityRequestedAction;

export type DeleteEntityStartedAction = { +type: typeof DELETE_ENTITY_STARTED };
export type DeleteEntityStartedActionCreator = () => DeleteEntityStartedAction;

export type DeleteEntitySucceededAction = { +type: typeof DELETE_ENTITY_SUCCEEDED };
export type DeleteEntitySucceededActionCreator = () => DeleteEntitySucceededAction;

export type DeleteEntityFailedAction = {
  +type: typeof DELETE_ENTITY_FAILED,
  +payload: ApiErrors
};
export type DeleteEntityFailedActionCreator = (payload: ApiErrors) => DeleteEntityFailedAction;

export type DeleteEntityAction =
  | DeleteEntityRequestedAction
  | DeleteEntityStartedAction
  | DeleteEntitySucceededAction
  | DeleteEntityFailedAction;

//------------------
// END DELETE ENTITY
//------------------

export type Action =
  | DatabaseAction
  | CreateEntityAction
  | ReadCollectionAction
  | ReadEntityAction
  | UpdateEntityAction
  | DeleteEntityAction;

export type ErrorReducer = (state: ApiErrors, action: Action) => ApiErrors;

export type IsConnectingReducer = (state: boolean, action: Action) => boolean;

export type ProjectState = {
  +error: ApiErrors,
  +isConnecting: boolean
};

export type GetErrorSelector = (state: AppState) => ApiErrors | null;

export type GetIsConnectingSelector = (state: AppState) => boolean;
