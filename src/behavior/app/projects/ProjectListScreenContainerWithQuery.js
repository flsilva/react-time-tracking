import flow from 'lodash/flow';
import { generateQueryForPagination, generateQueryForRelationship } from '../utils/QueryUtils';
import withPagination from '../utils/withPagination';
import ProjectListScreenContainer from './ProjectListScreenContainer';

const composeQuery = itemsPerPage => page => (
  flow([
    generateQueryForRelationship('author'),
    generateQueryForPagination({ page, itemsPerPage, sort: '-created-at' }),
  ])()
);

export default itemsPerPage => (
  withPagination(
    composeQuery(itemsPerPage),
  )(ProjectListScreenContainer)
);
