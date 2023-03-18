export function initPost(body?: string): RequestInit {
    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body,
    };
}

export function initPut(body?: string): RequestInit {
    return {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body,
    };
}
