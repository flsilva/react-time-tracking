/*
 * @flow
 */

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import humps from 'humps';
import type {
  CreateResourcePayload,
  ResourceMutationPayloadWrapper,
  UpdateResourcePayload,
} from '../resources/Types';
import type {
  HttpHeaders,
  HttpPatchRequest,
  HttpPatchRequestParams,
  HttpPostRequest,
  HttpPostRequestParams,
  HttpRequest,
  HttpRequestParams,
  HttpRequestLifeCycle,
  LifeCycleCallback,
} from './Types';

export type PayloadDasherizer = (
  payload: CreateResourcePayload | UpdateResourcePayload
) => CreateResourcePayload | UpdateResourcePayload;

export type HttpRequestLifeCycleMerger = (
  l1: HttpRequestLifeCycle | void,
  l2: HttpRequestLifeCycle | void
) => HttpRequestLifeCycle;

/*
export type HttpRequestMerger = (
  r1: HttpRequest | void,
  r2: HttpRequest | void
) => HttpRequest | void;

export type HttpPatchRequestMerger = (
  r1: HttpPatchRequest,
  r2: HttpPatchRequest
) => HttpPatchRequest;
*/
/*
export type HttpRequestCreator = (
  params1: HttpRequestParams,
  params2: HttpRequestParams
) => HttpRequest;

export type HttpPatchRequestCreator = (
  params1: HttpPatchRequestParams,
  params2: HttpPatchRequestParams
) => HttpPatchRequest;

export type HttpPostRequestCreator = (
  params1: HttpPostRequestParams,
  params2: HttpPostRequestParams
) => HttpPostRequest;
*/

// eslint-disable-next-line import/prefer-default-export
export const dasherizePayloadToApi: PayloadDasherizer = (
  payload: CreateResourcePayload | UpdateResourcePayload,
): CreateResourcePayload | UpdateResourcePayload => {
  if (!payload) throw new Error('Argument <payload> must not be null.');
  return humps.decamelizeKeys(payload, { separator: '-' });
};

export const mergeLifeCycles: HttpRequestLifeCycleMerger = (
  l1: HttpRequestLifeCycle | void,
  l2: HttpRequestLifeCycle | void,
): HttpRequestLifeCycle => {
  if (!l1 && !l2) return {};
  if (l1 && !l2) return l1;
  if (l2 && !l1) return l2;

  let l: HttpRequestLifeCycle = cloneDeep(l1);

  if (l2 && l2.failed) {
    if (!l.failed) l = merge({}, l, { failed: [] });
    l2.failed.forEach((cb: LifeCycleCallback) => {
      if (l.failed) l.failed.push(cb);
    });
  }

  if (l2 && l2.started) {
    if (!l.started) l = merge({}, l, { started: [] });
    l2.started.forEach((cb: LifeCycleCallback) => {
      if (l.started) l.started.push(cb);
    });
  }

  if (l2 && l2.succeeded) {
    if (l2.succeeded.afterUpdateResources) {
      if (!l.succeeded || !l.succeeded.afterUpdateResources) {
        l = merge({}, l, { succeeded: { afterUpdateResources: [] } });
      }

      l2.succeeded.afterUpdateResources.forEach((cb: LifeCycleCallback) => {
        if (l.succeeded && l.succeeded.afterUpdateResources) {
          l.succeeded.afterUpdateResources.push(cb);
        }
      });
    }

    if (l2.succeeded.beforeUpdateResources) {
      if (!l.succeeded || !l.succeeded.beforeUpdateResources) {
        l = merge({}, l, { succeeded: { beforeUpdateResources: [] } });
      }

      l2.succeeded.beforeUpdateResources.forEach((cb: LifeCycleCallback) => {
        if (l.succeeded && l.succeeded.beforeUpdateResources) {
          l.succeeded.beforeUpdateResources.push(cb);
        }
      });
    }
  }

  return l;
};

/*
export const mergeRequests: HttpRequestMerger = (
  r1: HttpRequest | void,
  r2: HttpRequest | void,
): HttpRequest | void => {
  if (!r1 && !r2) throw new Error('Arguments <r1> and <r2> are null.');

  if (r1 && r2) {
    const headers: HttpHeaders = merge({}, r1.headers, r2.headers);
    const lifecycle: HttpRequestLifeCycle = mergeLifeCycles(r1.lifecycle, r2.lifecycle);
    const method: string = r2.method || r1.method;
    const ignoreResponse: boolean | void = (
      r2.ignoreResponse || r1.ignoreResponse
    );
    const url: string = r2.url || r1.url;

    return {
      headers,
      lifecycle,
      method,
      ignoreResponse,
      url,
    };
  }

  return r1 || r2;
};
export const mergePatchRequests: HttpPatchRequestMerger = (
  r1: HttpPatchRequest,
  r2: HttpPatchRequest,
): HttpPatchRequest => {
  if (!r1 && !r2) throw new Error('Arguments <r1> and <r2> are null.');
  if (r1 && !r2) return r1;
  if (r2 && !r1) return r2;

  const r: HttpRequest | void = mergeRequests(r1, r2);
  const p1: ResourceMutationPayloadWrapper<UpdateResourcePayload> | void = (
    (r1 !== undefined) ? r1.payload : undefined
  );
  const p2: ResourceMutationPayloadWrapper<UpdateResourcePayload> | void = (
    (r2 !== undefined) ? r2.payload : undefined
  );

  const payload: UpdateResourcePayload = merge(p1, p2);

  return merge({}, r, { payload });
};
*/

/*
export const createRequest: HttpRequestCreator = (
  params1: HttpRequestParams | void,
  params2: HttpRequestParams | void,
): HttpRequest => {
  if (!params1 && !params2) throw new Error('Arguments <params1> and <params2> are null.');

  // We create a temp object here because it's easier to validate values,
  // but it doens't merge lifecycle object correctly, so we do that later.
  const tempRequest: HttpRequest = merge({}, params1, params2);
  //

  if (!tempRequest.method) {
    const methodError: string = 'At least one <method> string is mandatory' +
      ', but arguments <params1.method> and <params2.method> are null.';
    throw new Error(methodError);
  }

  if (!tempRequest.url) {
    const urlError: string = 'At least one <method> string is mandatory' +
      ', but arguments <params1.url> and <params2.url> are null.';
    throw new Error(urlError);
  }

  const lifecycle1: HttpRequestLifeCycle | void = (
    params1 !== undefined ? params1.lifecycle : undefined
  );
  const lifecycle2: HttpRequestLifeCycle | void = (
    params2 !== undefined ? params2.lifecycle : undefined
  );

  const lifecycle: HttpRequestLifeCycle = mergeLifeCycles(lifecycle1, lifecycle2);

  return {
    headers: tempRequest.headers,
    lifecycle,
    method: tempRequest.method,
    ignoreResponse: tempRequest.ignoreResponse,
    url: tempRequest.url,
  };
};

export const createPatchRequest: HttpPatchRequestCreator = (
  params1: HttpPatchRequestParams,
  params2: HttpPatchRequestParams,
): HttpPatchRequest => {
  if (!params1 && !params2) throw new Error('Arguments <params1> and <params2> are null.');

  const method1: string | void = (params1 !== undefined) ? params1.method : undefined;
  const method2: string | void = (params2 !== undefined) ? params2.method : undefined;

  let request: HttpRequest;

  if (!method1 && !method2) {
    const params3: HttpPatchRequestParams = merge({ method: 'PATCH' }, params2);
    request = createRequest(params1, params3);
  } else {
    request = createRequest(params1, params2);
  }

  const payload1: ResourceMutationPayloadWrapper<UpdateResourcePayload> | void = (
    params1 !== undefined ? params1.payload : undefined
  );

  const payload2: ResourceMutationPayloadWrapper<UpdateResourcePayload> | void = (
    params2 !== undefined ? params2.payload : undefined
  );

  if (!payload1 && !payload2) {
    const payloadError: string = 'At least one <payload> object is mandatory' +
      ', but arguments <params1.payload> and <params2.payload> are null.';
    throw new Error(payloadError);
  }

  const payload: UpdateResourcePayload = merge({}, payload1, payload2);

  return merge({}, request, { payload });
};

export const createPostRequest: HttpPostRequestCreator = (
  params1: HttpPostRequestParams,
  params2: HttpPostRequestParams,
): HttpPostRequest => {
  if (!params1 && !params2) throw new Error('Arguments <params1> and <params2> are null.');

  const method1: string | void = (params1 !== undefined) ? params1.method : undefined;
  const method2: string | void = (params2 !== undefined) ? params2.method : undefined;

  let request: HttpRequest;

  if (!method1 && !method2) {
    const params3: HttpPostRequestParams = merge({ method: 'POST' }, params2);
    request = createRequest(params1, params3);
  } else {
    request = createRequest(params1, params2);
  }

  const payload1: ResourceMutationPayloadWrapper<CreateResourcePayload> | void = (
    params1 !== undefined ? params1.payload : undefined
  );

  const payload2: ResourceMutationPayloadWrapper<CreateResourcePayload> | void = (
    params2 !== undefined ? params2.payload : undefined
  );

  const payload: CreateResourcePayload = merge({}, payload1, payload2);

  return merge({}, request, { payload });
};
*/
