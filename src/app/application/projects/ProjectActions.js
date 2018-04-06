/*
 * @flow
 */

import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPatchRequest,
  HttpPostRequest,
  HttpRequestLifeCycle,
  RequestAction,
} from '../shared/net/http/requests/Types';
import {
  mergeLifeCycles,
} from '../shared/net/http/requests/Utils';
import {
  createDeleteAction,
  createGetAction,
  createPatchAction,
  createPostAction,
} from '../shared/net/http/requests/Services';
import type { HttpQuery } from '../shared/net/http/requests/queries/Types';
import type {
  CreateResourcePayload,
  UpdateResourcePayload,
  ResourceMutationPayloadWrapper,
} from '../shared/net/http/resources/Types';
import { clearResourceDatabase } from '../shared/net/http/resources/Services';
import type {
  ResourceCreator,
  ResourceReader,
  ResourceRemover,
  ResourceUpdater,
} from './types';

export const REQUEST_ID: string = 'app/projects/request';

//----------------------
// BEGIN CREATE RESOURCE
//----------------------

export const createResource: ResourceCreator = (
  payload: ResourceMutationPayloadWrapper<CreateResourcePayload>,
  lifecycle?: HttpRequestLifeCycle,
): RequestAction<HttpPostRequest> => {
  const clearCache: HttpRequestLifeCycle = {
    succeeded: {
      beforeUpdateResources: [{
        fn: clearResourceDatabase, isAction: true, args: ['projects'],
      }],
    },
  };

  const mergedLifecycle: HttpRequestLifeCycle = mergeLifeCycles(clearCache, lifecycle);

  const request: HttpPostRequest = {
    id: REQUEST_ID,
    lifecycle: mergedLifecycle,
    method: 'POST',
    payload,
    url: 'projects/',
  };

  return createPostAction(request);
};

//--------------------
// END CREATE RESOURCE
//--------------------

//--------------------
// BEGIN READ RESOURCE
//--------------------

export const readResource: ResourceReader = (
  query: HttpQuery,
): RequestAction<HttpGetRequest> => {
  const request: HttpGetRequest = {
    id: REQUEST_ID,
    method: 'GET',
    query,
    url: `projects/${query.unit.id}`,
  };

  return createGetAction(request);
};

//------------------
// END READ RESOURCE
//------------------

//-------------------------------
// BEGIN READ RESOURCE COLLECTION
//-------------------------------

export const readCollection: ResourceReader = (
  query?: HttpQuery,
): RequestAction<HttpGetRequest> => {
  const request: HttpGetRequest = {
    id: REQUEST_ID,
    method: 'GET',
    query,
    url: 'projects/',
  };

  return createGetAction(request);
};

//-----------------------------
// END READ RESOURCE COLLECTION
//-----------------------------

//----------------------
// BEGIN UPDATE RESOURCE
//----------------------

export const updateResource: ResourceUpdater = (
  payload: ResourceMutationPayloadWrapper<UpdateResourcePayload>,
  lifecycle?: HttpRequestLifeCycle,
): RequestAction<HttpPatchRequest> => {
  const request: HttpPatchRequest = {
    id: REQUEST_ID,
    lifecycle,
    method: 'PATCH',
    payload,
    url: `projects/${payload.data.id}`,
  };

  return createPatchAction(request);
};

//--------------------
// END UPDATE RESOURCE
//--------------------

//----------------------
// BEGIN DELETE RESOURCE
//----------------------

export const deleteResource: ResourceRemover = (
  id: string,
  lifecycle?: HttpRequestLifeCycle,
): RequestAction<HttpDeleteRequest> => {
  const clearCache: HttpRequestLifeCycle = {
    succeeded: {
      beforeUpdateResources: [{
        fn: clearResourceDatabase, isAction: true, args: ['projects'],
      }],
    },
  };

  const mergedLifecycle: HttpRequestLifeCycle = mergeLifeCycles(clearCache, lifecycle);

  const request: HttpDeleteRequest = {
    id: REQUEST_ID,
    lifecycle: mergedLifecycle,
    method: 'DELETE',
    url: `projects/${id}`,
  };

  return createDeleteAction(request);
};

//--------------------
// END DELETE RESOURCE
//--------------------
