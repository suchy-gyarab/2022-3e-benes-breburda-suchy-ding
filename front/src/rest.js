const API_HOST = new URL("https://ding.ecko.ga/");

async function request(method, url, body = null, headers = {}, init = {}) {
    const params = {
        method,
        headers: {
            authorization: window.localStorage.getItem('api-key'),
            ...headers,
        },
        body: body != null ? JSON.stringify(body) : undefined,
        ...init,
    };

    const response = await fetch(new URL(url, API_HOST), params);
    return {
        status: response.status,
        body: response.headers.get("content-type")  == "application/json" ? await response.json() : null
    };    
}

async function get(url, headers = {}, init = {}) {
    return await request('GET', url, null, headers, init);
}

async function del(url, headers = {}, init = {}) {
    return await request('DELETE', url, null, headers, init);
}

async function post(url, body = null, headers = {}, init = {}) {
    return await request('POST', url, body, headers, init);
}

export default {
    get,
    post,
    del
}
