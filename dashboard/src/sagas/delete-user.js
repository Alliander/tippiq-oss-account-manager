import axios from 'axios'
import { call, put, takeLatest, } from 'redux-saga/effects'
import { get } from 'lodash'

import { deleteUserRoutine as routine } from '../routines'

function* deleteUser({ type, payload }) {
  console.log({payload})
  const { id } = payload
  try {
    const { data } = yield call(axios.delete, `/api/users/${id}`)
    yield put(routine.success(data))
  } catch(error) {
    const data = get(error, 'response.data', {})
    const message = typeof(data) === 'string' ? data : data.message || 'Onbekende fout' 
    yield put(routine.failure({success: false, error: {message}}))
  }
  yield put(routine.fulfill())
}

export default function* () {
  yield takeLatest(routine.TRIGGER, deleteUser);
}
