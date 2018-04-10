/*
 * @flow
 */

import type { RootState } from '../../../Types';
import type { HttpRequestAction } from '../Types';

export type ConnectingMap = { +[requestId: string]: boolean };

export type ConnectingReducer = (
  state: ConnectingMap,
  action: HttpRequestAction
) => ConnectingMap;

export type IsConnectingGetter = (state: RootState) => boolean;

export type IsConnectingGetterFactory = (requestId: string) => IsConnectingGetter;
