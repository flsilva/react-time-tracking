import withEntity from '../utils/withEntity';
import { readEntity } from './ProjectActions';
import { getEntity, getError, getIsConnecting, hasEntity } from './ProjectState';

export default withEntity({
  getEntity,
  getError,
  getIsConnecting,
  hasEntity,
  readEntity,
});
