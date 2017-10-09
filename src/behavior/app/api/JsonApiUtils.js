import humps from 'humps';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

export const addRelationshipToPayload = (payload, attrName, type, id) => {
  if (!payload) throw new Error('Argument <payload> must not be null.');
  if (!type) throw new Error('Argument <type> must not be null.');
  if (!id) throw new Error('Argument <id> must not be null.');

  return merge({ ...payload }, {
    data: {
      relationships: {
        [attrName]: {
          data: {
            id,
            type,
          },
        },
      },
    },
  });
};

export const formatPayloadToApi = (type, payload) => {
  if (!type) throw new Error('Argument <type> must not be null.');
  if (!payload) throw new Error('Argument <payload> must not be null.');

  const newPayload = humps.decamelizeKeys({
    data: {
      attributes: { ...payload },
      type,
    },
  }, { separator: '-' });

  if (newPayload.data.attributes.id) {
    newPayload.data.id = newPayload.data.attributes.id;
    delete newPayload.data.attributes.id;
  }

  if (isEmpty(newPayload.data.attributes)) delete newPayload.data.attributes;

  return newPayload;
};
