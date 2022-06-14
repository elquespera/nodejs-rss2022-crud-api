import { IncomingMessage, ServerResponse } from 'http';

import { Users } from './users';
import { sendMessage, send404 } from './messages';
import { parseUserID } from './url';

import 'dotenv/config';

const users = new Users();

const API_ROUTE = '/api/users';
const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

// Try to import PORT from .env file,
// if not, default to 5000
export const PORT = process.env.PORT || 5000;

// Process events from http Server
export const serverListener = (req: IncomingMessage, res: ServerResponse) => {

    // Check if API entry point is correct
    if (req.url.startsWith(API_ROUTE)) {
        const userID = parseUserID(req.url);
        //sendMessage(200, userID, res);

        switch (req.method) {
            case 'GET':

                break;            
            default:
                send404(res);    
        }
    }
    else {
        send404(res);
    }
}