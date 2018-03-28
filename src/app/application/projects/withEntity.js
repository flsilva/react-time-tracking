import withEntity from '../utils/withEntity';
import { hasQueryMetaResult } from '../shared/net/http/caching/Repository';
import { getEntityFactory } from '../DatabaseState';
import { readEntity } from './ProjectActions';
import { getError, getIsConnecting } from './ProjectState';

export default withEntity({
  getEntity: getEntityFactory('projects'),
  getError,
  getIsConnecting,
  hasQueryMetaResult,
  readEntity,
});
