import withEntity from '../utils/withEntity';
import { createRecordGetter } from '../shared/net/http/records/Repository';
import { hasQueryMetaResult } from '../shared/net/http/requests/queries/Repository';
import { createIsConnectingGetter } from '../shared/net/http/requests/connecting/Repository';
import { createErrorGetter } from '../shared/net/http/requests/errors/Repository';
import { readResource, REQUEST_ID } from './ProjectActions';

export default withEntity({
  getError: createErrorGetter(REQUEST_ID),
  getIsConnecting: createIsConnectingGetter(REQUEST_ID),
  getRecord: createRecordGetter('projects'),
  hasQueryMetaResult,
  readResource,
});
