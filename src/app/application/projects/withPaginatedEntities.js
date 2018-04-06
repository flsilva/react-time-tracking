import withPaginatedEntities from '../utils/withPaginatedEntities';
import { createRecordCollectionGetter } from '../shared/net/http/records/Repository';
import { createIsConnectingGetter } from '../shared/net/http/requests/connecting/Repository';
import { createErrorGetter } from '../shared/net/http/requests/errors/Repository';
import { readCollection, REQUEST_ID } from './ProjectActions';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getRecordCollection: createRecordCollectionGetter('projects'),
  getError: createErrorGetter(REQUEST_ID),
  getIsConnecting: createIsConnectingGetter(REQUEST_ID),
  readCollection,
});
