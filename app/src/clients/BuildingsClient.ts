import {doGet, doPost, doPut} from "./common";

export const fetchBuildings = async (limit: number = 10000, beforeId: number = 0) => {
    let url = `${process.env.REACT_APP_URL}/buildings?limit=${limit}&beforeId=${beforeId}`
    return await doGet(url);
}

export const addBuilding = async (values: any) => {
    const url = `${process.env.REACT_APP_URL}/buildings`;
    return doPost(url, values);
}

export const updateBuilding = async (values: any, id)  => {
    const url = `${process.env.REACT_APP_URL}/buildings/${id}`;
    return doPut(url, values);
}
