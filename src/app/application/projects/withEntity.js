import withEntity from '../utils/withEntity';
import { createRecordGetter } from '../shared/net/http/records/Repository';
import { hasQueryMetaResult } from '../shared/net/http/requests/queries/Repository';
import { readResource } from './ProjectActions';
import { getError, getIsConnecting } from './ProjectState';

export default withEntity({
  getError,
  getIsConnecting,
  getRecord: createRecordGetter('projects'),
  hasQueryMetaResult,
  readResource,
});
