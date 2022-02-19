import ActionTypes from "./ActionTypes";

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_EMPLOYEE_SUCCESS:
            return state.filter(e => e._id === action.payload._id);
        case ActionTypes.GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS:
            return [
                ...state,
                {
                    _id: 2,
                    name: action.payload.name,
                    birthDate: action.payload.birthDate,
                    gender: action.payload.gender,
                    salary: action.payload.salary
                }];
        case ActionTypes.UPDATE_SALARY_SUCCESS:
            return state.map(e => e._id === action.payload._id ? { ...e, salary: action.payload.salary } : e)
        case ActionTypes.DELETE_EMPLOYEE_SUCCESS:
            return 
        default:
            return state;
    }
}