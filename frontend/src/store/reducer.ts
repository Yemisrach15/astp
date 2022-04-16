import ActionTypes from "./actionTypes";
import { IState, ActionProp, IEmployee } from "../types/types";

const initialState: IState = {
	employees: [] as Array<IEmployee>,
	currentEmployee: {
		data: {} as IEmployee,
		loading: false
	},
};

export default function reducer(state: IState = initialState, action: ActionProp) {
	switch (action.type) {
		case ActionTypes.GET_EMPLOYEE:
			return {
				...state, currentEmployee: { ...state.currentEmployee, loading: true }
			}

		case ActionTypes.GET_EMPLOYEE_SUCCESS:
			return {
				...state, currentEmployee: { data: action.payload, loading: false }
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
				currentEmployee: { ...state.currentEmployee, data: action.payload },
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