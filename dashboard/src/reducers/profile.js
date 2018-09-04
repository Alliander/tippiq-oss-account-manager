import {handleActions} from 'redux-actions'
import { 
    loginRoutine,
    logoutRoutine,
    profileRoutine,
} from '../routines'

const profileInitialState = {
    user: null,
    success: false
}

export default handleActions({
    [loginRoutine.SUCCESS]: (state, {payload}) => payload,
    [profileRoutine.SUCCESS]: (state, {payload}) => payload,
    [loginRoutine.FAILURE]: () => profileInitialState,
    [loginRoutine.REQUEST]: () => profileInitialState,
    [logoutRoutine.SUCCESS]: () => profileInitialState,
}, profileInitialState)
