import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000/api/v1";

export const getAllEmployees = async () => axios.get("/employees");
export const getEmployee = async (id) => axios.get(`/employees/${id}`);
export const postEmployee = async (employee) => axios.post("/employees", employee);
export const putEmployee = async (id, employee) => axios.put(`/employees/${id}`, {...employee, birthDate: new Date(employee.birthDate) });
export const deleteEmployee = async (id) => axios.delete(`/employees/${id}`);