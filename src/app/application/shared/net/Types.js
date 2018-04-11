/*
 * @flow
 */

import type { HttpState } from './http/Types';

export type NetState = { +http: HttpState };

/*
 * The goal of this Type is to just represent the root of the application state,
 * where the lib's own state resides. That way, when internal modules have to access
 * their states, e.g. on selectors, and since they have to do so from the root state,
 * as that's the way redux itself works (one single immutable state),
 * they can Type the root state argument with this Type.
 * This is possible because the lib imposes users to "mount" it
 * in a fixed place of the root state, named "net".
 */
export type RootState = { +net: NetState };
/**/
