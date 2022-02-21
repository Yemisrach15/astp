import ActionTypes from "./ActionTypes";

export function getEmployee(data) {
    return {
        type: ActionTypes.GET_EMPLOYEE,
        payload: data
    }
}

export function getEmployees() {
    return {
        type: ActionTypes.GET_EMPLOYEES
    }
}

export function addNewEmployee(data) {
    return {
        type: ActionTypes.ADD_NEW_EMPLOYEE,
        payload: data
    }
}

export function updateSalary(data) {
    return {
        type: ActionTypes.UPDATE_SALARY,
        payload: data
    }
}

export function deleteEmployee(data) {
    return {
        type: ActionTypes.DELETE_EMPLOYEE,
        payload: data
    }
}