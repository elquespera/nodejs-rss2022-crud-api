import { validate as validateUUID } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';

import { User } from './user';


// Parse uuid from url like api/users/uuid
// and check whether it is valid
const parseUserID = (url: URL): string => {
    const parts = url.pathname.split('/');
    return validateUUID(parts[3]) ? parts[3] : undefined;
}

// Convert URL params into User class
const parseUserParams = (url: URL): User => {
    
    let hobbies;
    try {
        hobbies = JSON.parse(url.searchParams.get('hobbies'));
        hobbies = Array.isArray(hobbies) ? hobbies.map(String) : undefined;
    } 
    catch {}

    const user: User = {
        id: 'id',
        name: url.searchParams.get('name') || undefined,
        age: parseInt(url.searchParams.get('age')) || undefined,
        hobbies: hobbies
    }

    return Object.values(user).some(value => value === undefined) ? undefined : user;
}


interface UrlParams {
    path: string,
    id: string,
    data: User
}

const API_ROUTE = '/api/users';

const parseURL = (request: IncomingMessage): UrlParams => {

    const url = new URL(request.url, `http://${request.headers.host}`);
    
    const urlParams: UrlParams = {
        path: undefined,
        id: parseUserID(url),
        data: parseUserParams(url)
    }

    if (url.pathname.startsWith(API_ROUTE)) {
        const parts = url.pathname.split('/');
        switch (parts.length) {
            case 3:
                if (url.pathname === API_ROUTE) {
                    urlParams.path = API_ROUTE;
                }
                break;
            case 4:
                if (parts.slice(0, 3).join('/') === API_ROUTE) {
                    urlParams.path = API_ROUTE + '/';
                }
                break; 
        }
    }

    return urlParams;
}

export { parseURL, UrlParams, API_ROUTE };
