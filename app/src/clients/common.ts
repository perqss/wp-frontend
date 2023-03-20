import {initPost, initPut} from "./ClientUtils";

const getResponseBody = async (fetchResponse: Response) => {
    let data: unknown;
    try {
        data = await fetchResponse.json();
    } catch (e) {
        data = undefined;
    }
    return data;
}

export const doGet = async (url: string) => {
    return getResponseBody(await fetch(url));
}

export const doPost = async (url: string, request: any) => {
    return getResponseBody(await fetch(url, initPost(JSON.stringify(request))))
}

export const doPut = async (url: string, request: any) => {
    return getResponseBody(await fetch(url, initPut(JSON.stringify(request))))
}
