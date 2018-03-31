/*
 * @flow
 */

import type { RequestState } from './requests/Types';
import type { ResourceDatabase } from './resources/Types';

//-----------------
// BEGIN HTTP STATE
//-----------------

export type HttpState = { +requests: RequestState, +resources: ResourceDatabase };

//---------------
// END HTTP STATE
//---------------

//------------------
// BEGIN HTTP ERRORS
//------------------

export type HttpError = { +detail: string };

export type HttpErrorCollection = Array<HttpError> | null;

//----------------
// END HTTP ERRORS
//----------------
