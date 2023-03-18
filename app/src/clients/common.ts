import {initPost, initPut} from "./ClientUtils";

export class FetchError extends Error {
    public readonly status: number;
    constructor(status: number, message?: string) {
        super(message);
        this.status = status;
    }
}

const getResponseBody = async (fetchResponse: Response) => {
    if (!fetchResponse.ok) {
        throw new FetchError(fetchResponse.status, fetchResponse.statusText)
    }

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

export const doPost = async (url: string, request) => {
    return getResponseBody(await fetch(url, initPost(JSON.stringify(request))))
}

export const doPut = async (url: string, request) => {
    return getResponseBody(await fetch(url, initPut(JSON.stringify(request))))
}
