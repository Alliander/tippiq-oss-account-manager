import {handleActions} from 'redux-actions'
import { 
    searchUserRoutine,
    deleteUserRoutine,
} from '../routines'

const initialState = {
    id: null,
    results: null,
    error: null,
    success: false,
    loading: false,
}

console.log({FULFILL: searchUserRoutine.FULFILL})
export default handleActions({
    [deleteUserRoutine.TRIGGER]: (state) => ({...state, loading: true}),
    [deleteUserRoutine.SUCCESS]: (state, {payload}) => ({...state, ...payload}),
    [deleteUserRoutine.FAILURE]: (state, {payload}) => ({...state, ...payload}),
    [deleteUserRoutine.FULFILL]: (state) => ({...state, loading: false}),
    [searchUserRoutine.SUCCESS]: () => initialState,
}, initialState)
