import flow from 'lodash/flow';
import withPagination2 from '../utils/withPagination';
import { getPaginationQuery, getRelationshipQuery } from '../utils/QueryUtils';
import TimeLogListScreenContainer from './TimeLogListScreenContainer';

const getNextPageQuery = itemsPerPage => page => (
  flow([
    getRelationshipQuery('author,project'),
    getPaginationQuery({ page, itemsPerPage, sort: '-created-at' }),
  ])()
);

export default itemsPerPage => (
  withPagination2(
    getNextPageQuery(itemsPerPage),
  )(TimeLogListScreenContainer)
);
