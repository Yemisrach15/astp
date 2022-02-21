import { takeEvery, call, put, all } from 'redux-saga/effects';
import { getAllEmployees, getEmployee, postEmployee, putEmployee, deleteEmployee } from '../server/api';
import ActionTypes from './ActionTypes';

function* getEmployees() {
    try {
        const res = yield call(getAllEmployees);
        yield put({ type: ActionTypes.GET_EMPLOYEES_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.GET_EMPLOYEES_FAIL });
    }
}

function* getOneEmployee(action) {
    try {
        const res = yield call(getEmployee, action.payload._id);
        yield put({ type: ActionTypes.GET_EMPLOYEE_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.GET_EMPLOYEE_FAIL });
    }
}

function* newEmployee(action) {
    try {
        const res = yield call(postEmployee, action.payload);
        yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_FAIL });
    }
}

function* updateEmployee(action) {
    try {
        const res = yield call(putEmployee, action.payload._id, action.payload);
        yield put({ type: ActionTypes.UPDATE_SALARY_SUCCESS, payload: res.data });
    }
    catch {
        yield put({ type: ActionTypes.UPDATE_SALARY_FAIL })
    }
}

function* removeEmployee(action) {
    try {
        const res = yield call(deleteEmployee, action.payload._id);
        yield put({ type: ActionTypes.DELETE_EMPLOYEE_SUCCESS, payload: { _id: action.payload._id } });
    }
    catch {
        yield put({ type: ActionTypes.DELETE_EMPLOYEE_FAIL });
    }
}

function* watchGetEmployees() {
    yield takeEvery(ActionTypes.GET_EMPLOYEES, getEmployees);
}

function* watchGetOneEmployee() {
    yield takeEvery(ActionTypes.GET_EMPLOYEE, getOneEmployee);
}

function* watchCreateEmployee() {
    yield takeEvery(ActionTypes.ADD_NEW_EMPLOYEE, newEmployee);
}

function* watchUpdateEmployee() {
    yield takeEvery(ActionTypes.UPDATE_SALARY, updateEmployee);
}

function* watchRemoveEmployee() {
    yield takeEvery(ActionTypes.DELETE_EMPLOYEE, removeEmployee);
}

export default function* rootSaga() {
    yield all([
        watchGetEmployees(),
        watchGetOneEmployee(),
        watchCreateEmployee(),
        watchUpdateEmployee(),
        watchRemoveEmployee()
    ])
}