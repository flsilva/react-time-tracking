import withEntity from '../utils/withEntity';
import { hasQueryCache } from '../api/caching/Repository';
import { getEntityFactory } from '../DatabaseState';
import { readEntity } from './ProjectActions';
import { getError, getIsConnecting } from './ProjectState';

export default withEntity({
  getEntity: getEntityFactory('projects'),
  getError,
  getIsConnecting,
  hasQueryCache,
  readEntity,
});
