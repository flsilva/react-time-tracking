import withPaginatedEntities from '../utils/withPaginatedEntities';
import { createRecordCollectionGetter } from '../shared/net/http/records/Repository';
import { createConnectionChecker } from '../shared/net/http/requests/connections/Repository';
import { createErrorGetter } from '../shared/net/http/requests/errors/Repository';
import { readCollection, REQUEST_ID } from './ProjectActions';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getRecordCollection: createRecordCollectionGetter('projects'),
  getError: createErrorGetter(REQUEST_ID),
  getIsConnecting: createConnectionChecker(REQUEST_ID),
  readCollection,
});
