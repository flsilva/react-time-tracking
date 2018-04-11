/*
 * @flow
 */

import type { ErrorMap } from './errors/Types';
import type { ResourceDatabase } from './resources/Types';

export type ResponseState = {
  +errors: ErrorMap,
  +resources: ResourceDatabase
};
