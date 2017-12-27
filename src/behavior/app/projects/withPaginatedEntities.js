import withPaginatedEntities from '../utils/withPaginatedEntities';
import { readCollection } from './ProjectActions';
import { getCollection, getError, getIsConnecting } from './ProjectState';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getCollection,
  getError,
  getIsConnecting,
  readCollection,
});
