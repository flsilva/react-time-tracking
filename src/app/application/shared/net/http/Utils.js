import cloneDeep from 'lodash/cloneDeep';
import humps from 'humps';
import merge from 'lodash/merge';

export const formatPayloadToApi = (payload) => {
  if (!payload) throw new Error('Argument <payload> must not be null.');
  return humps.decamelizeKeys(payload, { separator: '-' });
};

export const generateQueryForPagination = ({ page, itemsPerPage, sort }) => query => (
  merge({ ...query }, {
    collection: {
      'page[number]': page,
      'page[size]': itemsPerPage,
      sort,
    },
  })
);

export const generateQueryForRelationship = relationships => query => (
  merge({ ...cloneDeep(query) }, { unit: { include: relationships } })
);

export const generateQueryForResourceId = id => query => (
  merge({ ...cloneDeep(query) }, { unit: { id } })
);
