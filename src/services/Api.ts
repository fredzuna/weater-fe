import { IQueryParams } from '../interfaces/IQueryParams';
import { API_BASE_URL } from './ApiConfig';

const TOKEN_KEY = 'authToken';

export const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getQueryString = (queryParams: IQueryParams) => {
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    return queryString;
}

const handleResponse = async (response: Response) => {
    // Check if it's a redirect response (status 3xx)
    if (response.redirected) {
        // Redirect URL
        const redirectUrl = response.url;

        // Use GET to fetch data from the redirected URL
        const redirectResponse = await fetch(redirectUrl);

        if (!redirectResponse.ok) {
            throw new Error(`Failed to fetch data after redirect. Status: ${redirectResponse.status}`);
        }

        return redirectResponse.json();
    }

    return response.json();
};

export const fetchData = async (path?: string, queryParams?: IQueryParams, method: string = 'GET', body?: object) => {
    let url = API_BASE_URL;

    if (path) {
        url = `${url}/${path}`;
    }

    if (queryParams) {
        const queryString = getQueryString(queryParams);
        url = `${url}?${queryString}`;
    }



    console.log(getTokenFromLocalStorage())

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
    };

    const options: RequestInit = {
        method,
        headers,
        //credentials: 'include', // Include if you are using cookies for authentication
    };

    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) && body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        return handleResponse(response);
    } catch (error) {
        throw error;
    }
};

export const get = async (path?: string, queryParams?: IQueryParams) => {
    return fetchData(path, queryParams, 'GET');
};

export const post = async (path?: string, body?: object) => {
    return fetchData(path, undefined, 'POST', body);
};

export const put = async (path?: string, body?: object) => {
    return fetchData(path, undefined, 'PUT', body);
};

export const del = async (path?: string, body?: object) => {
    return fetchData(path, undefined, 'DELETE', body);
};

export const patch = async (path?: string, body?: object) => {
    return fetchData(path, undefined, 'PATCH', body);
};

export const login = async (email: string, password: string) => {
    const response = await post('auth/login', { email, password });

    if (response && response.access_token) {
        saveTokenToLocalStorage(response.access_token);
    }

    return response;
};

export const register = async (email: string, password: string) => {
    const response = await post('auth/register', { email, password });

    if (response && response.access_token) {
        saveTokenToLocalStorage(response.access_token);
    }

    return response;
};