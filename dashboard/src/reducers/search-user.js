import {handleActions} from 'redux-actions'
import { 
    searchUserRoutine,
    deleteUserRoutine,
    logoutRoutine,
} from '../routines'

const initialState = {
    user: null,
    error: null,
    success: false,
    loading: false,
}

console.log({FULFILL: searchUserRoutine.FULFILL})
export default handleActions({
    [searchUserRoutine.TRIGGER]: () => ({...initialState, loading: true}),
    [searchUserRoutine.SUCCESS]: (state, {payload}) => ({...state, ...payload}),
    [searchUserRoutine.FAILURE]: (state, {payload}) => ({...state, ...payload}),
    [searchUserRoutine.FULFILL]: (state) => ({...state, loading: false}),
    [deleteUserRoutine.SUCCESS]: () => initialState,
    [logoutRoutine.SUCCESS]: () => initialState,
}, initialState)
