import withPaginatedEntities from '../utils/withPaginatedEntities';
import { createErrorGetter } from '../shared/net/http/responses/errors';
import { createRecordCollectionGetter } from '../shared/net/http/responses/records';
import { createConnectionChecker } from '../shared/net/http/requests/connections';
import { readCollection, REQUEST_ID } from './ProjectActions';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getRecordCollection: createRecordCollectionGetter('projects'),
  getError: createErrorGetter(REQUEST_ID),
  getIsConnecting: createConnectionChecker(REQUEST_ID),
  readCollection,
});
