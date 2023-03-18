import {doGet, doPost} from "./common";

export const fetchAirReadings = async (limit: number = 10000, beforeId: number = 0) => {
    let url = `${process.env.REACT_APP_URL}/airReadings?limit=${limit}&beforeId=${beforeId}`;
    return await doGet(url);
}

export const addAirReading = async (values) => {
    const url = `${process.env.REACT_APP_URL}/airReadings`;
    return doPost(url, values);
}
