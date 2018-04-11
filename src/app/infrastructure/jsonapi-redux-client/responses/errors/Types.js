/*
 * @flow
 */

import type { RootState } from '../../Types';
import type { HttpRequestAction } from '../../requests/Types';

export type HttpError = { +detail: string };

export type HttpErrorCollection = Array<HttpError> | null;

export type ErrorMap = { +[requestId: string]: HttpErrorCollection };

export type ErrorReducer = (
  state: ErrorMap,
  action: HttpRequestAction
) => ErrorMap;

export type ErrorGetter = (state: RootState) => HttpErrorCollection;

export type ErrorGetterFactory = (requestId: string) => ErrorGetter;
