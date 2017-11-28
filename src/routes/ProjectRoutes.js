import pipe from 'lodash/fp/pipe';
import withRouterParams from '../behavior/app/utils/withRouterParams';
import withQuery from '../behavior/app/utils/withQuery';
import withPagination from '../behavior/app/utils/withPagination';
import withForm from '../behavior/app/utils/withForm';
import {
  generateQueryForPagination,
  generateQueryForRelationship,
} from '../behavior/app/utils/QueryUtils';
import withNavBack from '../behavior/app/navigation/withNavBack';
import { getNavTo } from '../behavior/app/navigation';
import withAsyncEntityForm from '../behavior/app/utils/withAsyncEntityForm';
import withProjectEntity from '../behavior/app/projects/withEntity';
import withProjectEntityForm from '../behavior/app/projects/withEntityForm';
import withPaginatedEntities from '../behavior/app/projects/withPaginatedEntities';
import ProjectFormScreenContainer from '../behavior/app/projects/ProjectFormScreenContainer';
import ProjectListScreenContainer from '../behavior/app/projects/ProjectListScreenContainer';

const composeQueryFunction = itemsPerPage => page => (
  pipe([
    generateQueryForRelationship('author'),
    generateQueryForPagination({ page, itemsPerPage, sort: '-created-at' }),
  ])()
);

const navToEntity = (id) => {
  getNavTo()(`/app/projects/${id}`);
};

const navToNewEntity = () => {
  getNavTo()('/app/projects/new');
};

const navToProjectList = () => {
  getNavTo()('/app/projects');
};

export const EditProjectRoute = pipe([
  withAsyncEntityForm,
  withNavBack,
  withForm,
  withProjectEntityForm(navToProjectList),
  withProjectEntity,
  withQuery(generateQueryForRelationship('author')),
  withRouterParams({ projectId: 'id' }),
])(ProjectFormScreenContainer);

export const NewProjectRoute = pipe([
  withNavBack,
  withForm,
  withProjectEntityForm(navToProjectList),
])(ProjectFormScreenContainer);

export const ProjectListRoute = pageSize => (
  pipe([
    withPaginatedEntities,
    withPagination,
    withQuery(composeQueryFunction(pageSize)),
  ])(ProjectListScreenContainer({ navToEntity, navToNewEntity }))
);
