import withPaginatedEntities from '../utils/withPaginatedEntities';
import {
  createErrorGetter,
  createRecordCollectionGetter,
  createConnectionChecker,
} from '../../infrastructure/jsonapi-redux-client';
import { readCollection, REQUEST_ID } from './ProjectActions';

export default ({ autoLoad }) => withPaginatedEntities({
  autoLoad,
  getRecordCollection: createRecordCollectionGetter('projects'),
  getError: createErrorGetter(REQUEST_ID),
  getIsConnecting: createConnectionChecker(REQUEST_ID),
  readCollection,
});
