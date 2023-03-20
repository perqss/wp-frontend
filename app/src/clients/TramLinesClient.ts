import {doGet} from "./common";

export const fetchTramLines = async (limit: number = 10000, beforeId: number = 0) => {
    let url: string = `${process.env.REACT_APP_URL}/tramLines?limit=${limit}&beforeId=${beforeId}`;
    return await doGet(url);
}
