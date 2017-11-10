import withCrudForm from '../utils/withCrudForm';
import { createEntity, deleteEntity, updateEntity } from './ProjectActions';

export default (getNavigator) => {
  const successCb = () => {
    getNavigator().push('/app/projects');
  };

  const toFormValues = (entity = {}) => ({
    name: entity.name || '',
  });

  return withCrudForm({
    createEntity,
    deleteEntity,
    successCb,
    toFormValues,
    updateEntity,
  });
};
