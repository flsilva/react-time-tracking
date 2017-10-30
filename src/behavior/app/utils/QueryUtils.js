export const getPaginationQuery = ({ page, itemsPerPage, sort }) => (query = {}) => ({
  ...query,
  'page[number]': page,
  'page[size]': itemsPerPage,
  sort,
});

export const getRelationshipQuery = relationships => query => ({
  ...query,
  include: relationships,
});
