import pipe from 'lodash/fp/pipe';
import withRouterParams from '../behavior/app/utils/withRouterParams';
import withQuery from '../behavior/app/utils/withQuery';
import withForm from '../behavior/app/utils/withForm';
import { generateQueryForRelationship } from '../behavior/app/utils/QueryUtils';
import withNavBack from '../behavior/app/navigation/withNavBack';
import withNavTo from '../behavior/app/navigation/withNavTo';
import withAsyncEntityForm from '../behavior/app/utils/withAsyncEntityForm';
import withProjectEntity from '../behavior/app/projects/withEntity';
import withProjectEntityForm from '../behavior/app/projects/withEntityForm';
import ProjectFormScreenContainer from '../behavior/app/projects/ProjectFormScreenContainer';

export const ProjectFormRoute = pipe([
  withAsyncEntityForm,
  withNavBack,
  withForm,
  withProjectEntityForm,
  withNavTo,
  withProjectEntity,
  withQuery(generateQueryForRelationship('author')),
  withRouterParams({ projectId: 'id' }),
])(ProjectFormScreenContainer);
