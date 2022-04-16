import ActionTypes from "./actionTypes";

export const addEmployee = (payload: Object) => ({ type: ActionTypes.ADD_NEW_EMPLOYEE, payload });

export const getEmployee = (payload: Object) => ({ type: ActionTypes.GET_EMPLOYEE, payload });

export const getEmployees = (payload: Object) => ({ type: ActionTypes.GET_EMPLOYEES, payload });

export const updateEmployee = (payload: Object) => ({ type: ActionTypes.UPDATE_SALARY, payload });

export const deleteEmployee = (payload: Object) => ({ type: ActionTypes.DELETE_EMPLOYEE, payload });
