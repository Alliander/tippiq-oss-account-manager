import { createRoutine } from 'redux-saga-routines'
import { createAction } from 'redux-actions'

export const loginRoutine = createRoutine('LOGIN')
export const logoutRoutine = createRoutine('LOGOUT')
export const profileRoutine = createRoutine('PROFILE')
export const searchUserRoutine = createRoutine('SEARCH_USER')
export const serviceProviderRoutine = {
    load: createAction('SERVICE_PROVIDER_LOAD'),
    success: createAction('SERVICE_PROVIDER_SUCCESS'),
}
export const deleteUserRoutine = createRoutine('DELETE_USER')
