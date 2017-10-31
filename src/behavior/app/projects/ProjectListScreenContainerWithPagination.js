import flow from 'lodash/flow';
import withPagination from '../utils/withPagination';
import { getPaginationQuery, getRelationshipQuery } from '../utils/QueryUtils';
import ProjectListScreenContainer from './ProjectListScreenContainer';

const getNextPageQuery = itemsPerPage => page => (
  flow([
    getRelationshipQuery('author'),
    getPaginationQuery({ page, itemsPerPage, sort: '-created-at' }),
  ])()
);

export default itemsPerPage => (
  withPagination(
    getNextPageQuery(itemsPerPage),
  )(ProjectListScreenContainer)
);
