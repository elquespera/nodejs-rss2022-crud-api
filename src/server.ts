import { IncomingMessage, ServerResponse } from 'http';

import { Users } from './users';
import { sendMessage, send400, send404, ERROR_404_USER } from './messages';
import { parseUserID } from './url';

import 'dotenv/config';

const users = new Users();

users.add('Somebody', 22, []);
users.add('Ann', 245, []);
users.add('Joe Smith', 38, ['Piano', 'Cooking']);
users.add('Jill', 55, ['Skating']);

const API_ROUTE = '/api/users';

// Try to import PORT from .env file,
// if not, default to 5000
export const PORT = process.env.PORT || 5000;

// Process events from http Server
export const serverListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log(req.url);

    if (req.method === 'GET' && req.url === API_ROUTE) {
        sendMessage(200, users.getAllUsers(), res);
    } 
    else if (req.url.startsWith(API_ROUTE)) {
        const userID = parseUserID(req.url);

        switch (req.method) {
            case 'GET':
                if (userID) {
                    const user = users.getUser(userID);
                    if (user) {
                        sendMessage(200, user, res);
                    } else {
                        send404(res, ERROR_404_USER(userID));
                    }
                } else {
                    send400(res);
                }
                break;
            case 'POST': 
                break;
            case 'PUT':
                break;
            case 'DELETE':
                if (userID) {
                    if (users.delete(userID)) {
                        sendMessage(204, '', res);
                    } else {
                        send404(res, ERROR_404_USER(userID));
                    }
                } else {
                    send400(res);
                }
                break;
        }
    } 
    else {
        send404(res);
    }
}