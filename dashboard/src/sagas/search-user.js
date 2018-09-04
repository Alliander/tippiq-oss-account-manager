import axios from 'axios'
import { call, put, takeLatest, } from 'redux-saga/effects'
import { get, uniq } from 'lodash'
import jp from 'jsonpath'

import { searchUserRoutine as routine } from '../routines'

function* searchUser({ type, payload: {email} }) {
  try {
    const { data } = yield call(axios.get, `/api/users/email/${email}`)
    let serviceProviders = []
    for (const id of uniq(jp.query(data, '$.user.places[*].policies[*].serviceProviderId'))) {
      const { data: { serviceProvider }} = yield call(axios.get, `/api/service-provider/${id}`)
      serviceProviders.push(serviceProvider)
    }
    yield put(routine.success({...data, serviceProviders}))
  } catch(error) {
    const data = get(error, 'response.data', {})
    const message = typeof(data) === 'string' ? data : data.message || 'Onbekende fout' 
    yield put(routine.failure({success: false, error: {message}}))
  }
  yield put(routine.fulfill())
}

export default function* () {
  yield takeLatest(routine.TRIGGER, searchUser);
}
