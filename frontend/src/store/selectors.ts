import { IState } from "../types/types";

export const getEmployeesState = (store: IState) => store.employees;

export const getCurrentEmployeeState = (store: IState) => store.currentEmployee;
