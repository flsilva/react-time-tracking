import withEntity from '../utils/withEntity';
import { readEntity } from './ProjectActions';
import { getEntityById, getError, getIsConnecting } from './ProjectState';

export default withEntity({
  getEntityById,
  getError,
  getIsConnecting,
  readEntity,
});
