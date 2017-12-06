import pipe from 'lodash/fp/pipe';
import withQuery from '../utils/withQuery';
import withPagination from '../utils/withPagination';
import {
  generateQueryForPagination,
  generateQueryForRelationship,
} from '../utils/QueryUtils';
import withPaginatedProjectEntities from './withPaginatedEntities';
import CreateProjectDropDownContainer from './ProjectDropDownContainer';

const composeEntitiesQueryFunction = itemsPerPage => page => (
  pipe([
    generateQueryForRelationship('author'),
    generateQueryForPagination({ page, itemsPerPage, sort: '-created-at' }),
  ])()
);

// eslint-disable-next-line import/prefer-default-export
export const CreateProjectDropDown = (params) => {
  const defaultParams = { autoLoad: true, pageSize: 999 };
  const { autoLoad, navToNewEntity, pageSize } = { ...defaultParams, ...params };

  return pipe([
    withPaginatedProjectEntities({ autoLoad }),
    withPagination,
    withQuery(composeEntitiesQueryFunction(pageSize)),
  ])(CreateProjectDropDownContainer(navToNewEntity));
};
