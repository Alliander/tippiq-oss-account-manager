import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { profileRoutine } from '../routines'

function* profile() {
  try {
    const { data: { success, user }} = yield call(axios.get, '/api/auth/profile')
    if (success) {
      yield put(profileRoutine.success({ success, user }))
    } else {
      yield put(profileRoutine.failure({ success }))
    }
  } catch (error) { 
      yield put(profileRoutine.failure({ success: false, error }))
  }
  finally {
    yield put(profileRoutine.fulfill())
  }
}

export default function* takeProfile() {
  yield takeLatest(profileRoutine.TRIGGER, profile);
}
