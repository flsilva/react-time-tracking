import withPaginatedEntities from '../utils/withPaginatedEntities';
import { readEntities } from './ProjectActions';
import { getEntities, getError, getIsConnecting } from './ProjectState';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getEntities,
  getError,
  getIsConnecting,
  readEntities,
});
