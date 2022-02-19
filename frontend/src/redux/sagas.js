import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import ActionTypes from './ActionTypes';

export function* getEmployeesSaga() {
    yield takeEvery(ActionTypes.GET_EMPLOYEES, fetchEmployees);
}

function* fetchEmployees() {
    try {
        const res = yield call(employeeFetch);
        yield put({type: ActionTypes.GET_EMPLOYEES_SUCCESS, payload: res});
    }
    catch {
        yield takeEvery(ActionTypes.GET_EMPLOYEES_FAIL);
    }
}

function employeeFetch() {
    return axios.get('http://localhost:9000/api/v1/employees')
    .then(res => res.data);
}