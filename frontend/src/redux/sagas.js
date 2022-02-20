import { takeEvery, call, put, all } from 'redux-saga/effects';
import { getAllEmployees, createEmployee } from '../server/api';
import ActionTypes from './ActionTypes';

function* watchGetEmployees() {
    yield takeEvery(ActionTypes.GET_EMPLOYEES, getEmployees);
}

function* getEmployees() {
    try {
        const res = yield call(getAllEmployees);
        yield put({ type: ActionTypes.GET_EMPLOYEES_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.GET_EMPLOYEES_FAIL });
    }
}

function* watchCreateEmployee() {
    yield takeEvery(ActionTypes.ADD_NEW_EMPLOYEE, newEmployee);
}

function* newEmployee(action) {
    try {
        const res = yield call(createEmployee, action.payload);
        yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_FAIL });
    }
}

export default function* rootSaga() {
    yield all([
        watchGetEmployees(),
        watchCreateEmployee()
    ])
}