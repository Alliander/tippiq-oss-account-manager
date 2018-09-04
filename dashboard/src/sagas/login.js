import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { loginRoutine } from '../routines'

function* login({ type, payload: data }) {
  try {
    const { data: { success, user }} = yield call(axios.post, '/api/auth/login', data)
    yield put(loginRoutine.success({ success, user }))
  } catch(error) {
    const { response: { data: { success }}} = error
    yield put(loginRoutine.failure({ success, error }))
  }
  yield put(loginRoutine.fulfill())
}

export default function* takeLogin() {
  yield takeLatest(loginRoutine.TRIGGER, login);
}
