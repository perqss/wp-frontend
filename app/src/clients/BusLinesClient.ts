import {doGet} from "./common";

export const fetchBusLines = async (limit: number = 10000, beforeId: number = 0) => {
    let url = `${process.env.REACT_APP_URL}/busLines?limit=${limit}&beforeId=${beforeId}`
    return await doGet(url);
}
