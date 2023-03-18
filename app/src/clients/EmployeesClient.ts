import {doGet} from "./common";

export const fetchEmployees = async (limit: number = 10000, beforeId: number = 0) => {
    let url = `${process.env.REACT_APP_URL}/employees?limit=${limit}&beforeId=${beforeId}`
    return await doGet(url);
}