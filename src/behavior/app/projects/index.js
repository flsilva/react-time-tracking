import pipe from 'lodash/fp/pipe';
import withNavBack from '../navigation/withNavBack';
import withAsyncEntityForm from '../utils/withAsyncEntityForm';
import withForm from '../utils/withForm';
import withPagination from '../utils/withPagination';
import withQuery from '../utils/withQuery';
import {
  generateQueryForPagination,
  generateQueryForRelationship,
} from '../utils/QueryUtils';
import withPaginatedProjectEntities from './withPaginatedEntities';
import withProjectEntity from './withEntity';
import withProjectEntityForm from './withEntityForm';
import CreateProjectDropdownContainer from './ProjectDropdownContainer';
import ProjectFormScreenContainer from './ProjectFormScreenContainer';
import ProjectListScreenContainer from './ProjectListScreenContainer';

const composeEntitiesQueryFunction = itemsPerPage => page => (
  pipe([
    generateQueryForRelationship('author'),
    generateQueryForPagination({ page, itemsPerPage, sort: '-created-at' }),
  ])()
);

export const CreateEditProjectScreen = ({ navToEntities }) => pipe([
  withAsyncEntityForm,
  withNavBack,
  withForm,
  withProjectEntityForm(navToEntities),
  withProjectEntity,
  withQuery(generateQueryForRelationship('author')),
])(ProjectFormScreenContainer);

export const CreateNewProjectScreen = ({ navToEntities }) => pipe([
  withNavBack,
  withForm,
  withProjectEntityForm(navToEntities),
])(ProjectFormScreenContainer);

export const CreateProjectDropdown = (params) => {
  const defaultParams = { autoLoad: true, pageSize: 999 };
  const { autoLoad, navToNewEntity, pageSize } = { ...defaultParams, ...params };

  return pipe([
    withPaginatedProjectEntities({ autoLoad }),
    withPagination,
    withQuery(composeEntitiesQueryFunction(pageSize)),
  ])(CreateProjectDropdownContainer(navToNewEntity));
};

export const CreateProjectListScreen = ({ itemsPerPage, navToEntity, navToNewEntity }) => (
  pipe([
    withPaginatedProjectEntities({ autoLoad: true }),
    withPagination,
    withQuery(composeEntitiesQueryFunction(itemsPerPage)),
  ])(ProjectListScreenContainer({ navToEntity, navToNewEntity }))
);
