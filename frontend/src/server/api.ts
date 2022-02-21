import axios from "axios";
import { IEmployee } from '../types/types';

axios.defaults.baseURL = "http://localhost:9000/api/v1";

export const getAllEmployees = async () => axios.get("/employees");
export const getEmployee = async (id: string) => axios.get(`/employees/${id}`);
export const postEmployee = async (employee: IEmployee) => axios.post("/employees", employee);
export const putEmployee = async (id: string, employee: IEmployee) => axios.put(`/employees/${id}`, {...employee, birthDate: new Date(employee.birthDate) });
export const deleteEmployee = async (id: string) => axios.delete(`/employees/${id}`);