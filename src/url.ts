import { validate as validateUUID } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';

import { User } from './user';

// Parse uuid from url like api/users/uuid
// and check whether it is valid
const parseUserID = (url: string): string => {
    const parts = url.split('/');
    //console.log(parts);
    return validateUUID(parts[3]) ? parts[3] : undefined;
}

const parseUserParams = (request: IncomingMessage): User => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    let hobbies:Array<string>;
    try {
        hobbies = JSON.parse(url.searchParams.get('hobbies'));
        hobbies = Array.isArray(hobbies) ? hobbies.map(String) : undefined;
    } 
    catch { }

    const user: User = {
        id: 'id',
        name: url.searchParams.get('name') || undefined,
        age: parseInt(url.searchParams.get('age')) || undefined,
        hobbies: hobbies
    }
    return Object.values(user).some(value => value === undefined) ? undefined : user;
}

export { parseUserID, parseUserParams };
