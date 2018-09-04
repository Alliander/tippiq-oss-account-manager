import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { logoutRoutine } from '../routines'

function* login({ type, payload: data }) {
  try {
    const { data: { success }} = yield call(axios.post, '/api/auth/logout', data)
    yield put(logoutRoutine.success({ success }))
  } catch(error) {
    const { response: { data: { success }}} = error
    yield put(logoutRoutine.failure({ success, error }))
  }
  yield put(logoutRoutine.fulfill())
}

export default function* takeLogout() {
  yield takeLatest(logoutRoutine.TRIGGER, login);
}
