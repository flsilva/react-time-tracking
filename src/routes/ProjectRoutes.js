import pipe from 'lodash/fp/pipe';
import withRouterParams from '../behavior/app/utils/withRouterParams';
import { getNavTo } from '../behavior/app/navigation';
import {
  CreateEditProjectScreen,
  CreateNewProjectScreen,
  CreateProjectListScreen,
} from '../behavior/app/projects';

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
])(CreateEditProjectScreen({ navToEntities }));

export const NewProjectRoute = CreateNewProjectScreen({ navToEntities });

export const ProjectListRoute = itemsPerPage => (
  CreateProjectListScreen({
    itemsPerPage,
    navToEntity,
    navToNewEntity,
  })
);
