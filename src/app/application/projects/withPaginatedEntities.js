import withPaginatedEntities from '../utils/withPaginatedEntities';
import { createRecordCollectionGetter } from '../shared/net/http/records/Repository';
import { readCollection } from './ProjectActions';
import { getError, getIsConnecting } from './ProjectState';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getRecordCollection: createRecordCollectionGetter('projects'),
  getError,
  getIsConnecting,
  readCollection,
});
