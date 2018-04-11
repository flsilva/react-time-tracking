/*
 * @flow
 */

import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import merge from 'lodash/merge';
import trim from 'lodash/trim';
import humps from 'humps';
import type {
  ResourceIdentifier,
  ResourceIdentifierCollection,
  ResourceMutationPayloadWrapper,
  ResourcePayload,
  ResourceRelationshipMap,
} from '../responses/resources/Types';
import type {
  HttpRequest,
  HttpRequestLifeCycle,
  LifeCycleCallback,
} from './Types';

export type PayloadDasherizer = (payload: ResourcePayload) => ResourcePayload;

export type HttpRequestLifeCycleMerger = (
  l1: HttpRequestLifeCycle | void,
  l2: HttpRequestLifeCycle | void
) => HttpRequestLifeCycle;

export type PatchPayloadCreator = (
  resourceType: string,
  resourceId: string,
  attributes: {}
) => ResourceMutationPayloadWrapper;

export type PayloadRelationshipCreator = (
  relName: string,
  identifier: ResourceIdentifier
) => ResourceRelationshipMap;

export type PostPayloadCreator = (
  resourceType: string,
  attributes: {},
  relationships?: ResourceRelationshipMap,
) => ResourceMutationPayloadWrapper;

export type RequestLifeCycleCreator = (callback: LifeCycleCallback) => HttpRequestLifeCycle;

export type RequestValidator = (request: HttpRequest) => void;

export type UrlRequestCreator = (identifiers: ResourceIdentifierCollection) => string;

export const createAfterUpdateResourcesLifeCycle: RequestLifeCycleCreator = (
  callback: LifeCycleCallback,
): HttpRequestLifeCycle => {
  if (!callback) throw new Error(`Invalid <callback> argument: ${callback}`);

  if (!isFunction(callback.fn)) {
    const callbackError: string = 'Argument <callback.fn> must be a valid function.' +
      ` Received: ${String(callback)}`;
    throw new Error(callbackError);
  }

  return { succeeded: { afterUpdateResources: [callback] } };
};

export const createBeforeUpdateResourcesLifeCycle: RequestLifeCycleCreator = (
  callback: LifeCycleCallback,
): HttpRequestLifeCycle => {
  if (!callback) throw new Error(`Invalid <callback> argument: ${callback}`);

  if (!isFunction(callback.fn)) {
    const callbackError: string = 'Argument <callback.fn> must be a valid function.' +
      ` Received: ${String(callback)}`;
    throw new Error(callbackError);
  }

  return { succeeded: { beforeUpdateResources: [callback] } };
};

export const createPatchPayload: PatchPayloadCreator = (
  resourceType: string,
  resourceId: string,
  attributes: {},
): ResourceMutationPayloadWrapper => {
  if (!isString(resourceType) || isEmpty(trim(resourceType))) {
    const typeError: string = 'Argument <resourceType> must be a valid string.' +
      ` Received: ${resourceType}`;
    throw new Error(typeError);
  }

  if (!isString(resourceId) || isEmpty(trim(resourceId))) {
    const idError: string = 'Argument <resourceId> must be a valid string.' +
      ` Received: ${resourceId}`;
    throw new Error(idError);
  }

  if (!attributes || !isPlainObject(attributes)) {
    const attributesError: string = 'Argument <attributes> must be a valid object.' +
      ` Received: ${String(attributes)}`;
    throw new Error(attributesError);
  }

  return {
    data: {
      attributes,
      id: resourceId,
      type: resourceType,
    },
  };
};

export const createPayloadRelationship: PayloadRelationshipCreator = (
  relName: string,
  identifier: ResourceIdentifier,
): ResourceRelationshipMap => {
  if (!identifier) throw new Error(`Invalid <identifier> argument: ${identifier}`);

  const type: string = identifier.type;
  if (!isString(type) || isEmpty(trim(type))) {
    const typeError: string = '<identifier.type> property must be a valid string.' +
      ` Received: ${identifier.type}`;
    throw new Error(typeError);
  }

  const id: string = identifier.id || '';
  if (!isString(id) || isEmpty(trim(id))) {
    const idError: string = '<identifier.id> property must be a valid string.' +
      ` Received: ${id}`;
    throw new Error(idError);
  }

  return {
    [relName]: {
      data: { id, type },
    },
  };
};

export const createPostPayload: PostPayloadCreator = (
  resourceType: string,
  attributes: {},
  relationships?: ResourceRelationshipMap,
): ResourceMutationPayloadWrapper => {
  if (!isString(resourceType) || isEmpty(trim(resourceType))) {
    const typeError: string = 'Argument <resourceType> must be a valid string.' +
      ` Received: ${resourceType}`;
    throw new Error(typeError);
  }

  if (!attributes || !isPlainObject(attributes)) {
    const attributesError: string = 'Argument <attributes> must be a valid object.' +
      ` Received: ${String(attributes)}`;
    throw new Error(attributesError);
  }

  return {
    data: {
      attributes,
      relationships: { ...relationships },
      type: resourceType,
    },
  };
};

export const createRequestUrl: UrlRequestCreator = (
  identifiers: ResourceIdentifierCollection,
): string => {
  if (!identifiers || !Array.isArray(identifiers)) {
    throw new Error(`Argument <identifiers> must be a valid array. Received: ${identifiers}`);
  }

  if (identifiers.length < 1) {
    const emptyError: string = 'Argument <identifiers> must have at least one ' +
      'ResourceIdentifier object, but an empty Array was provided.';
    throw new Error(emptyError);
  }

  const url: string = identifiers.reduce(
    (acc: string, identifier: ResourceIdentifier): string => {
      if (!identifier) throw new Error(`Invalid <identifier> object: ${identifier}`);

      const type: string = identifier.type;
      if (!isString(type) || isEmpty(trim(type))) {
        const typeError: string = '<identifier.type> property must be a valid string.' +
          ` Received: ${identifier.type}`;
        throw new Error(typeError);
      }

      let path: string = acc + type;

      const id: string = identifier.id || '';
      if (isString(id) && !isEmpty(trim(id))) path += `/${id}`;

      path += '/';
      return path;
    },
  '');

  return url.substring(0, url.length - 1); // removes last forward slash
};

export const dasherizePayloadToApi: PayloadDasherizer = (
  payload: ResourcePayload,
): ResourcePayload => {
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

export const validateRequest: RequestValidator = (request: HttpRequest) => {
  if (!request) throw new Error('Argument <request> must not be null.');

  const id: string = request.id;
  if (!isString(id) || isEmpty(trim(id))) {
    throw new Error(`Argument <request.id> must be a valid string. Received: ${id}`);
  }

  const method: string = request.method;
  if (!isString(method) || isEmpty(trim(method))) {
    throw new Error(`Argument <request.method> must be a valid string. Received: ${method}`);
  }

  const url: string = request.url;
  if (!isString(url) || isEmpty(trim(url))) {
    throw new Error(`Argument <request.url> must be a valid string. Received: ${url}`);
  }
};
