import withEntity from '../utils/withEntity';
import { getEntityFactory } from '../DatabaseState';
import { readEntity } from './ProjectActions';
import { getError, getIsConnecting, hasEntity } from './ProjectState';

export default withEntity({
  getEntity: getEntityFactory('projects'),
  getError,
  getIsConnecting,
  hasEntity,
  readEntity,
});
