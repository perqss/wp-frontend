import {doGet} from "./common";

export const fetchTickets = async (limit: number = 10000, beforeId: number = 0) => {
    let url = `${process.env.REACT_APP_URL}/tickets?limit=${limit}&beforeId=${beforeId}`
    return await doGet(url);
}