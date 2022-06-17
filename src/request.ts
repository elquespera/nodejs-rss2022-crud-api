import { validate as validateUUID } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';

import User  from './user.js';


// Parse uuid from url like api/users/uuid
// and check whether it is valid
const parseUserID = (url: URL): string => {
    const parts = url.pathname.split('/');
    return validateUUID(parts[3]) ? parts[3] : undefined;
}

// Convert request body into User class
const parseUserParams = (body: string): User => {
    try {
        const userData = JSON.parse(body);

        const user: User = {
            id: 'id',
            name: userData.name || undefined,
            age: parseInt(userData.age) || undefined,
            hobbies: Array.isArray(userData.hobbies) ? userData.hobbies : undefined,
        }

        return Object.values(user).some(value => value === undefined) ? undefined : user;
    }
    catch {
        return undefined;
    }
}


interface RequestParams {
    path: string,
    id: string,
    data: User
}

const API_ROUTE = '/api/users';

const parseRequest = (request: IncomingMessage, body: string): RequestParams => {

    const url = new URL(request.url, `http://${request.headers.host}`);
    
    const requestParams: RequestParams = {
        path: undefined,
        id: parseUserID(url),
        data: parseUserParams(body)
    }

    if (url.pathname.startsWith(API_ROUTE)) {
        const parts = url.pathname.split('/');
        switch (parts.length) {
            case 3:
                if (url.pathname === API_ROUTE) {
                    requestParams.path = API_ROUTE;
                }
                break;
            case 4:
                if (parts.slice(0, 3).join('/') === API_ROUTE) {
                    requestParams.path = API_ROUTE + '/';
                }
                break; 
        }
    }

    return requestParams;
}

export { parseRequest, RequestParams, API_ROUTE };
