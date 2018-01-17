/*
 * @flow
 */

import type {
  ClearEntitiesAction,
  ClearEntitiesActionCreator,
} from './types';
import { CLEAR_ENTITIES } from './types';

// eslint-disable-next-line import/prefer-default-export
export const clearEntities: ClearEntitiesActionCreator = (
  payload: string,
): ClearEntitiesAction => ({
  type: CLEAR_ENTITIES,
  payload,
});
