import {doGet} from "./common";

export const fetchVehicles = async (limit: number = 10000, beforeId: number = 0) => {
    let url: string = `${process.env.REACT_APP_URL}/vehicles?limit=${limit}&beforeId=${beforeId}`;
    return await doGet(url);
}
