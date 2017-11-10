import withCrudForm from '../utils/withCrudForm';
import { createEntity, updateEntity } from './ProjectActions';

export default (getNavigator) => {
  const successCb = () => {
    getNavigator().push('/app/projects');
  };

  const toFormValues = (entity = {}) => ({
    name: entity.name || '',
  });

  return withCrudForm({
    createEntity,
    successCb,
    toFormValues,
    updateEntity,
  });
};
