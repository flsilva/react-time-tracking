/*
 * @flow
 */

import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import trim from 'lodash/trim';
import type {
  ClearCacheAction,
  ClearCacheActionCreator,
} from './Types';
import { CLEAR_CACHE } from './Types';

// eslint-disable-next-line import/prefer-default-export
export const clearCache: ClearCacheActionCreator = (
  payload: string,
): ClearCacheAction => {
  if (!isString(payload) || isEmpty(trim(payload))) {
    throw new Error(`Argument <payload> must be a valid string. Received: ${payload}`);
  }

  return {
    type: CLEAR_CACHE,
    payload,
  };
};
