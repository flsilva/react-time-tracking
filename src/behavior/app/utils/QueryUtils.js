export const generateQueryForPagination = ({ page, itemsPerPage, sort }) => (query = {}) => ({
  ...query,
  'page[number]': page,
  'page[size]': itemsPerPage,
  sort,
});

export const generateQueryForRelationship = relationships => query => ({
  ...query,
  include: relationships,
});
