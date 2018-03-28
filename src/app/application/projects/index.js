import pipe from 'lodash/fp/pipe';
import withNavBack from '../navigation/withNavBack';
import withAsyncEntityForm from '../utils/withAsyncEntityForm';
import withForm from '../utils/withForm';
import withPagination from '../utils/withPagination';
import withQuery from '../utils/withQuery';
import {
  generateQueryForPagination,
  generateQueryForRelationship,
  generateQueryForResourceId,
} from '../shared/net/http/Utils';
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
  ])({ resourceType: 'projects' })
);

const composeEntityQueryFunction = relationships => id => (
  pipe([
    generateQueryForRelationship(relationships),
    generateQueryForResourceId(id),
  ])({ resourceType: 'projects' })
);

export const EditProjectScreenFactory = ({ navToEntities }) => pipe([
  withAsyncEntityForm,
  withNavBack,
  withForm,
  withProjectEntityForm(navToEntities),
  withProjectEntity,
  withQuery(composeEntityQueryFunction('author')),
])(ProjectFormScreenContainer);

export const NewProjectScreenFactory = ({ navToEntities }) => pipe([
  withNavBack,
  withForm,
  withProjectEntityForm(navToEntities),
])(ProjectFormScreenContainer);

export const ProjectDropdownFactory = (params) => {
  const defaultParams = { autoLoad: true, pageSize: 999 };
  const { autoLoad, navToNewEntity, pageSize } = { ...defaultParams, ...params };

  return pipe([
    withPaginatedProjectEntities({ autoLoad }),
    withPagination,
    withQuery(composeEntitiesQueryFunction(pageSize)),
  ])(CreateProjectDropdownContainer(navToNewEntity));
};

export const ProjectListScreenFactory = ({ itemsPerPage, navToEntity, navToNewEntity }) => (
  pipe([
    withPaginatedProjectEntities({ autoLoad: true }),
    withPagination,
    withQuery(composeEntitiesQueryFunction(itemsPerPage)),
  ])(ProjectListScreenContainer({ navToEntity, navToNewEntity }))
);
