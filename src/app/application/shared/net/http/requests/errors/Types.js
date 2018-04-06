/*
 * @flow
 */

import type { AppState } from '../../../../../types';
import type { HttpErrorCollection } from '../../Types';
import type { HttpRequestAction } from '../Types';

export type ErrorMap = { +[requestId: string]: HttpErrorCollection };

export type ErrorReducer = (
  state: ErrorMap,
  action: HttpRequestAction
) => ErrorMap;

export type ErrorState = { +errors: ErrorMap };

export type ErrorGetter = (state: AppState) => HttpErrorCollection;

export type ErrorGetterFactory = (requestId: string) => ErrorGetter;
