import cloneDeep from 'lodash/cloneDeep';
import { makeHttpRequest } from '../';
import { addRelationshipToPayload, formatPayloadToApi } from './JsonApiUtils';

export const apiMiddleware = store => next => (action) => {
  // console.log('formatApiPayloadMiddleware() - action', action);

  if (!action.meta || !action.meta.http) return next(action);

  const newAction = cloneDeep(action);
  newAction.meta.http.fetcher = makeHttpRequest;

  const { entity, request } = newAction.meta.http;

  if (!entity || !request || !request.data) return next(newAction);

  request.data = formatPayloadToApi(entity.type, request.data);

  const { relationships } = entity;
  if (relationships) {
    request.data = relationships.reduce((data, rel) => {
      const { user } = newAction.meta.auth;
      const id = rel.id === 'AUTH_USER_ID' ? user.id : rel.id;
      return addRelationshipToPayload(data, rel.attrName, rel.type, id);
    }, request.data);
  }

  return next(newAction);
};
