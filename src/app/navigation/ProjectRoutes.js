import pipe from 'lodash/fp/pipe';
import withRouterParams from '../application/utils/withRouterParams';
import { getNavTo } from '../application/navigation';
import {
  EditProjectScreenFactory,
  NewProjectScreenFactory,
  ProjectListScreenFactory,
} from '../application/projects';

export const navToEntities = () => {
  getNavTo()('/app/projects');
};

export const navToEntity = (id) => {
  getNavTo()(`/app/projects/${id}`);
};

export const navToNewEntity = () => {
  getNavTo()('/app/projects/new');
};

export const EditProjectRoute = pipe([
  withRouterParams({ projectId: 'id' }),
])(EditProjectScreenFactory({ navToEntities }));

export const NewProjectRoute = NewProjectScreenFactory({ navToEntities });

export const ProjectListRoute = itemsPerPage => (
  ProjectListScreenFactory({
    itemsPerPage,
    navToEntity,
    navToNewEntity,
  })
);
