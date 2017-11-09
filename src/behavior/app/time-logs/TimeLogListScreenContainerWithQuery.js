import flow from 'lodash/flow';
import withPagination from '../utils/withPagination';
import { generateQueryForPagination, generateQueryForRelationship } from '../utils/QueryUtils';
import TimeLogListScreenContainer from './TimeLogListScreenContainer';

const getNextPageQuery = itemsPerPage => page => (
  flow([
    generateQueryForRelationship('author,project'),
    generateQueryForPagination({ page, itemsPerPage, sort: '-created-at' }),
  ])()
);

export default itemsPerPage => (
  withPagination(
    getNextPageQuery(itemsPerPage),
  )(TimeLogListScreenContainer)
);
