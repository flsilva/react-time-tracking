/*
 * @flow
 */

import type { JsonApiState } from '../infrastructure/jsonapi-redux-client/Types';

export type AppState = { +jsonApi: JsonApiState };
