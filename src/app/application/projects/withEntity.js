import withEntity from '../utils/withEntity';
import { readResource, REQUEST_ID, RESOURCE_TYPE } from './ProjectActions';

export default withEntity({
  readResource,
  requestId: REQUEST_ID,
  resourceType: RESOURCE_TYPE,
});
