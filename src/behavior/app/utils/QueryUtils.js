import merge from 'lodash/merge';

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
  merge({ ...query }, { unit: { include: relationships } })
);

export const generateQueryForResourceId = id => query => (
  merge({ ...query }, { unit: { id } })
);
