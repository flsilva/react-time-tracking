/*
 * @flow
 */

import type { AppState } from '../../../../../types';
import type { HttpRequestAction } from '../Types';

export type ConnectingMap = { +[requestId: string]: boolean };

export type ConnectingReducer = (
  state: ConnectingMap,
  action: HttpRequestAction
) => ConnectingMap;

export type ConnectingState = { +connecting: ConnectingMap };

export type IsConnectingGetter = (state: AppState) => boolean;

export type IsConnectingGetterFactory = (requestId: string) => IsConnectingGetter;
