/*
 * @flow
 */

import type { RootState } from '../../../Types';
import type { HttpRequestAction } from '../Types';

export type ConnectionMap = { +[requestId: string]: boolean };

export type ConnectionReducer = (
  state: ConnectionMap,
  action: HttpRequestAction
) => ConnectionMap;

export type ConnectionChecker = (state: RootState) => boolean;

export type ConnectionCheckerFactory = (requestId: string) => ConnectionChecker;
