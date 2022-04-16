import { AxiosResponse } from 'axios';
import { takeEvery, call, put, all } from 'redux-saga/effects';
import { getAllEmployees, postEmployee, putEmployee, deleteEmployee, getOneEmployee } from '../server/api';
import ActionTypes from './actionTypes';
import { IEmployee, IAction } from '../types/types';

function* getEmployee(action: IAction) {
	try {
		const res: AxiosResponse<IEmployee> = yield call(getOneEmployee, action.payload._id!);
		yield put({ type: ActionTypes.GET_EMPLOYEE_SUCCESS, payload: res.data });
	}
	catch {
		yield put({ type: ActionTypes.GET_EMPLOYEE_FAIL });
	}
}

function* getEmployees() {
	try {
		const res: AxiosResponse<Array<IEmployee>> = yield call(getAllEmployees);
		yield put({ type: ActionTypes.GET_EMPLOYEES_SUCCESS, payload: res.data });
	}
	catch {
		yield put({ type: ActionTypes.GET_EMPLOYEES_FAIL });
	}
}

function* newEmployee(action: IAction) {
	try {
		const res: AxiosResponse<IEmployee> = yield call(postEmployee, action.payload);
		yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS, payload: res.data });
	}
	catch {
		yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_FAIL });
	}
}

function* updateEmployee(action: IAction) {
	try {
		const res: AxiosResponse<IEmployee> = yield call(putEmployee, action.payload._id!, action.payload);
		yield put({ type: ActionTypes.UPDATE_SALARY_SUCCESS, payload: res.data });
	}
	catch {
		yield put({ type: ActionTypes.UPDATE_SALARY_FAIL })
	}
}

function* removeEmployee(action: IAction) {
	try {
		yield call(deleteEmployee, action.payload._id!);
		yield put({ type: ActionTypes.DELETE_EMPLOYEE_SUCCESS, payload: { _id: action.payload._id } });
	}
	catch {
		yield put({ type: ActionTypes.DELETE_EMPLOYEE_FAIL });
	}
}

function* watchGetEmployee() {
	yield takeEvery(ActionTypes.GET_EMPLOYEE, getEmployee);
}

function* watchGetEmployees() {
	yield takeEvery(ActionTypes.GET_EMPLOYEES, getEmployees);
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
		watchGetEmployee(),
		watchGetEmployees(),
		watchCreateEmployee(),
		watchUpdateEmployee(),
		watchRemoveEmployee()
	])
}