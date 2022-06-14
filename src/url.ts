import { validate as validateUUID } from 'uuid';

// Parse uuid from url like api/users/uuid
// and check whether it is valid
const parseUserID = (url: string): string => {
    const parts = url.split('/');
    //console.log(parts);
    return validateUUID(parts[3]) ? parts[3] : undefined;
}

export { parseUserID };
