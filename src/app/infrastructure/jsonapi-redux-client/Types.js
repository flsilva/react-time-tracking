/*
 * @flow
 */

import type { RequestState } from './requests/Types';
import type { ResponseState } from './responses/Types';

export type JsonApiState = { +requests: RequestState, +responses: ResponseState };

/*
 * The goal of this Type is to just represent the root of the application state,
 * where this lib's own state resides. That way, when lib's internal modules have to access
 * their states, e.g. on selectors, and since they have to do so from the root state,
 * as that's the way redux itself works (one single immutable state),
 * they can Type the root state argument using this Type.
 * This is possible because this lib imposes users to "mount" it
 * at a fixed place on the root state ("jsonApi").
 */
export type RootState = { +jsonApi: JsonApiState };
/**/

export type ArrayReducer<Acc, Value> = (
  acc: Acc,
  value: Value,
  currentIndex: number,
  array: Array<Value>,
) => Acc;
