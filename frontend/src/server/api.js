import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000/api/v1";

export const getAllEmployees = async () => axios.get("/employees");
export const getEmployee = async (id) => axios.get(`/employees/${id}`);
export const createEmployee = async (employee) => axios.post("/employees", employee);
export const updateEmployee = async (id, employee) => axios.post(`/employees/${id}`, employee);
export const deleteEmployee = async (id) => axios.delete(`/employees/${id}`);