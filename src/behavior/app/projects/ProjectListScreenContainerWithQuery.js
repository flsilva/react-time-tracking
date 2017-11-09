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

/*
 * For project listing screen we want all entities, no real pagination.
 * Although, to keep API simpler, we leverage same pagination logic.
 */
export default itemsPerPage => (
  withPagination(
    composeQuery(itemsPerPage),
  )(ProjectListScreenContainer)
);


/*
const composeQuery = itemsPerPage => () => (
  flow([
    generateQueryForRelationship('author'),
    generateQueryForPagination({ page: 1, itemsPerPage, sort: '-created-at' }),
  ])()
);

export default () => (
  <ProjectListScreenContainer getQuery={composeQuery(999)} />
);
*/
