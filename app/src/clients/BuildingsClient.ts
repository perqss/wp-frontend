import {doGet, doPost, doPut} from "./common";

export const fetchBuildings = async (limit: number = 10000, beforeId: number = 0) => {
    let url: string = `${process.env.REACT_APP_URL}/buildings?limit=${limit}&beforeId=${beforeId}`;
    return await doGet(url);
}

export const addBuilding = async (values: any) => {
    const url: string = `${process.env.REACT_APP_URL}/buildings`;
    return doPost(url, values);
}

export const updateBuilding = async (values: any, id: number)  => {
    const url: string = `${process.env.REACT_APP_URL}/buildings/${id}`;
    return doPut(url, values);
}
