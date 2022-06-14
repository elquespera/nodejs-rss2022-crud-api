import { validate as validateUUID } from 'uuid';

// Parse uuid from url like api/users/uuid
// and check whether it is valid
const parseUserID = (url: string): string | boolean => {
    const parts = url.split('/');
    return validateUUID(parts[2]) ? parts[2] : false;
}

export { parseUserID };
