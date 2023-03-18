import {doGet} from "./common";

export const fetchBuildings = async (limit: number = 10000, beforeId: number = 0) => {
    let url = `${process.env.REACT_APP_URL}/buildings?limit=${limit}&beforeId=${beforeId}`
    return await doGet(url);
}