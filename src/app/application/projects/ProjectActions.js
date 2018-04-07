/*
 * @flow
 */

import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import trim from 'lodash/trim';
import type {
  HttpRequest,
  HttpRequestLifeCycle,
  RequestAction,
} from '../shared/net/http/requests/Types';
import {
  DELETE_REQUEST,
  GET_REQUEST,
  PATCH_REQUEST,
  POST_REQUEST,
} from '../shared/net/http/requests/Types';
import {
  createBeforeUpdateResourcesLifeCycle,
  createRequestUrl,
  mergeLifeCycles,
} from '../shared/net/http/requests/Utils';
import { createRequestAction } from '../shared/net/http/requests/Services';
import type { HttpQuery } from '../shared/net/http/requests/queries/Types';
import type { ResourceMutationPayloadWrapper } from '../shared/net/http/resources/Types';
import { clearResourceDatabase } from '../shared/net/http/resources/Services';
import type {
  ResourceCreator,
  ResourceReader,
  ResourceRemover,
  ResourceUpdater,
} from './types';

export const REQUEST_ID: string = 'app/projects/request';
export const RESOURCE_TYPE: string = 'projects';

//----------------------
// BEGIN CREATE RESOURCE
//----------------------

export const createResource: ResourceCreator = (
  payload: ResourceMutationPayloadWrapper,
  lifecycle?: HttpRequestLifeCycle,
): RequestAction => {
  const clearCache: HttpRequestLifeCycle = createBeforeUpdateResourcesLifeCycle({
    fn: clearResourceDatabase,
    isAction: true,
    args: [RESOURCE_TYPE],
  });

  const request: HttpRequest = {
    id: REQUEST_ID,
    lifecycle: mergeLifeCycles(clearCache, lifecycle),
    method: POST_REQUEST,
    payload,
    url: createRequestUrl([{ type: RESOURCE_TYPE }]),
  };

  return createRequestAction(request);
};

//--------------------
// END CREATE RESOURCE
//--------------------

//--------------------
// BEGIN READ RESOURCE
//--------------------

export const readResource: ResourceReader = (
  query: HttpQuery,
): RequestAction => {
  if (!query) throw new Error('Argument <query> must be a valid object.');
  if (!query.unit) throw new Error('Argument <query.unit> must be a valid object.');

  const id: string = query.unit.id || '';
  if (!isString(id) || isEmpty(trim(id))) {
    throw new Error('Argument <query.unit.id> must be a valid string.');
  }

  const request: HttpRequest = {
    id: REQUEST_ID,
    method: GET_REQUEST,
    query,
    url: createRequestUrl([{ type: RESOURCE_TYPE, id }]),
  };

  return createRequestAction(request);
};

//------------------
// END READ RESOURCE
//------------------

//-------------------------------
// BEGIN READ RESOURCE COLLECTION
//-------------------------------

export const readCollection: ResourceReader = (
  query?: HttpQuery,
): RequestAction => createRequestAction({
  id: REQUEST_ID,
  method: GET_REQUEST,
  query,
  url: createRequestUrl([{ type: RESOURCE_TYPE }]),
});

//-----------------------------
// END READ RESOURCE COLLECTION
//-----------------------------

//----------------------
// BEGIN UPDATE RESOURCE
//----------------------

export const updateResource: ResourceUpdater = (
  payload: ResourceMutationPayloadWrapper,
  lifecycle?: HttpRequestLifeCycle,
): RequestAction => createRequestAction({
  id: REQUEST_ID,
  lifecycle,
  method: PATCH_REQUEST,
  payload,
  url: createRequestUrl([{ type: RESOURCE_TYPE, id: payload.data.id }]),
});

//--------------------
// END UPDATE RESOURCE
//--------------------

//----------------------
// BEGIN DELETE RESOURCE
//----------------------

export const deleteResource: ResourceRemover = (
  id: string,
  lifecycle?: HttpRequestLifeCycle,
): RequestAction => {
  if (!isString(id) || isEmpty(trim(id))) {
    throw new Error('Argument <id> must be a valid string.');
  }

  const clearCache: HttpRequestLifeCycle = createBeforeUpdateResourcesLifeCycle({
    fn: clearResourceDatabase,
    isAction: true,
    args: [RESOURCE_TYPE],
  });

  const request: HttpRequest = {
    id: REQUEST_ID,
    lifecycle: mergeLifeCycles(clearCache, lifecycle),
    method: DELETE_REQUEST,
    url: createRequestUrl([{ type: RESOURCE_TYPE, id }]),
  };

  return createRequestAction(request);
};

//--------------------
// END DELETE RESOURCE
//--------------------
