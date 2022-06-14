import { IncomingMessage, ServerResponse } from 'http';

import { Users } from './users';
import { sendMessage, send400, send404, ERROR_404_USER, ERROR_400_FIELD } from './messages';
import { parseUserID, parseUserParams } from './url';

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
        sendMessage(res, 200, users.getAllUsers());
    } 
    else if (req.url.startsWith(API_ROUTE)) {
        const userID = parseUserID(req.url);
        const userParams = parseUserParams(req);

        switch (req.method) {
            case 'GET':
                if (userID) {
                    const user = users.getUser(userID);
                    if (user) {
                        sendMessage(res, 200, user);
                    } else {
                        send404(res, ERROR_404_USER(userID));
                    }
                } else {
                    send400(res);
                }
                break;
            case 'POST':
                if (userParams) {
                    const newUser = users.add(userParams.name, userParams.age, userParams.hobbies);
                    sendMessage(res, 201, newUser);
                } else {
                    send400(res, ERROR_400_FIELD);
                }
                break;
            case 'PUT':
                break;
            case 'DELETE':
                if (userID) {
                    if (users.delete(userID)) {
                        sendMessage(res, 204);
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