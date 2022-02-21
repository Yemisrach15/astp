import ActionTypes from "./ActionTypes";
import { IEmployee, IState, ActionProp } from "../types/types";

interface IEmployeeOpt extends Omit<IEmployee, 'birthDate'> {
    birthDate?: Date;
}

const initialState: IState<IEmployeeOpt> = {
    employees: [],
    currentEmployee: {}
};

export default function reducer(state: IState<IEmployeeOpt> = initialState, action: ActionProp) {
    switch (action.type) {
        case ActionTypes.GET_EMPLOYEE:
            return {
                ...state,
                currentEmployee: state.employees.find((e) => e._id === action.payload._id)
            }
        case ActionTypes.GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.payload
            }
        case ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: [
                    ...state.employees,
                    action.payload
                ]
            };
        case ActionTypes.UPDATE_SALARY_SUCCESS:
            return {
                ...state,
                currentEmployee: {...state.currentEmployee, salary: action.payload.salary},
                employees: state.employees.map(e => e._id === action.payload._id ? { ...e, salary: action.payload.salary } : e)
            }
        case ActionTypes.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: state.employees.filter(e => e._id !== action.payload._id)
            }
        default:
            return state;
    }
}