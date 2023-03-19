import {doDelete, doGet, doPost, doPut} from "./common";

export const fetchEmployees = async (limit: number = 10000, beforeId: number = 0) => {
    const url = `${process.env.REACT_APP_URL}/employees?limit=${limit}&beforeId=${beforeId}`;
    return await doGet(url);
}

export const addEmployee = async (values: any) => {
    const url = `${process.env.REACT_APP_URL}/employees`;
    return doPost(url, values);
}

export const updateEmployee = async (values: any, id) => {
    const url = `${process.env.REACT_APP_URL}/employees/${id}`;
    return doPut(url, values);
}

export const deleteEmployee = async (employeeId) => {
    const url = `${process.env.REACT_APP_URL}/employees/${employeeId}`;
    return doDelete(url);
}
