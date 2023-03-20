import {doGet, doPost, doPut} from "./common";

export const fetchTickets = async (limit: number = 10000, beforeId: number = 0) => {
    let url: string = `${process.env.REACT_APP_URL}/tickets?limit=${limit}&beforeId=${beforeId}`
    return await doGet(url);
}

export const addTicket = async (values: any) => {
    const url: string = `${process.env.REACT_APP_URL}/tickets`;
    return doPost(url, values);
}

export const updateTicket = async (values: any, id: number)  => {
    const url: string = `${process.env.REACT_APP_URL}/tickets/${id}`;
    return doPut(url, values);
}
