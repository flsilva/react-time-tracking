import withPaginatedEntities from '../utils/withPaginatedEntities';
import { readEntities } from './ProjectActions';
import { getEntitiesByQuery, getError, getIsConnecting } from './ProjectState';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getEntitiesByQuery,
  getError,
  getIsConnecting,
  readEntities,
});
