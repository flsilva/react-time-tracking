/*
 * @flow
 */

import type { RequestState } from './requests/Types';
import type { ResponseState } from './responses/Types';

export type HttpState = { +requests: RequestState, +responses: ResponseState };
