import { apiRequest } from '../api/Api.Actions'

export const NEW_TOKEN_RECEIVED = 'NEW_TOKEN_RECEIVED'
export const newTokenReceived = (payload) => ({ type: NEW_TOKEN_RECEIVED, payload })
