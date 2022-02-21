import ActionTypes from "./ActionTypes";

const initialState = {
    employees: [],
    currentEmployee: {}
};

export default function reducer(state = initialState, action) {
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