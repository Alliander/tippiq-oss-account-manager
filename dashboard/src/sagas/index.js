import { all, fork } from 'redux-saga/effects'
import { routinesWatcherSaga } from 'redux-saga-routines';

import loginWatcherSaga from './login'
import logoutWatcherSaga from './logout'
import profileWatcherSaga from './profile'
import searchUserWatcherSaga from './search-user'
import deleteUserWatcherSaga from './delete-user'

export default function* root() {
  yield all([
    fork(loginWatcherSaga),
    fork(logoutWatcherSaga),
    fork(profileWatcherSaga),
    fork(searchUserWatcherSaga),
    fork(deleteUserWatcherSaga),
    fork(routinesWatcherSaga),
  ])
}