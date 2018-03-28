import withPaginatedEntities from '../utils/withPaginatedEntities';
import { getCollectionFactory } from '../DatabaseState';
import { readCollection } from './ProjectActions';
import { getError, getIsConnecting } from './ProjectState';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getCollection: getCollectionFactory('projects'),
  getError,
  getIsConnecting,
  readCollection,
});
