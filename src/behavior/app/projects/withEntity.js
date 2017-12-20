import withEntity from '../utils/withEntity';
import { readEntity } from './ProjectActions';
import { getEntityById, getError, getIsConnecting, hasEntity } from './ProjectState';

export default withEntity({
  getEntityById,
  getError,
  getIsConnecting,
  hasEntity,
  readEntity,
});
