import { IncomingMessage, ServerResponse } from 'http';

import { Users } from './users';
import { sendMessage, sendMessageIfDefined, send400, 
         send404, send500, ERROR_400_FIELD } from './messages';
import { parseURL, UrlParams, API_ROUTE } from './url';

import 'dotenv/config';

const users = new Users();

users.add('Somebody', 22, []);
users.add('Ann', 245, []);
users.add('Joe Smith', 38, ['Piano', 'Cooking']);
users.add('Jill', 55, ['Skating']);


// Try to import PORT from .env file,
// if not, default to 5000
export const PORT = process.env.PORT || 5000;

// Process events from http Server
export const serverListener = (req: IncomingMessage, res: ServerResponse) => {

    const isPathValid = (path: string, method: string): boolean => {
        return ((path === API_ROUTE && ['GET', 'POST'].includes(method)) ||
                (path === API_ROUTE + '/' && ['GET', 'PUT', 'DELETE'].includes(method))); 
    }

    try {
        const url: UrlParams = parseURL(req);

        // Check if url is valid for a given method
        if (isPathValid(url.path, req.method)) {

            // Method Switch
            switch (req.method) {
                case 'GET':
                    if (url.path === API_ROUTE) {
                        sendMessage(res, 200, users.getAllUsers());
                    }
                    else {              
                        if (url.id) {
                            sendMessageIfDefined(res, 200, url.id, users.getUser(url.id));
                        } else 
                            send400(res);
                    }
                    break;

                case 'POST': 
                    if (url.data) {
                        sendMessage(res, 201, users.update(url.data, true));
                    }
                    else
                        send400(res, ERROR_400_FIELD);
                    break;   

                case 'PUT': 
                    if (url.id) {
                        if (url.data) {
                            url.data.id = url.id;
                            sendMessageIfDefined(res, 200, url.id, users.update(url.data));
                        } else {
                            send400(res, ERROR_400_FIELD);
                        }
                    } else 
                        send400(res);
                    
                    break;  

                case 'DELETE':
                    if (url.id) {
                        sendMessageIfDefined(res, 204, url.id, users.delete(url.id));
                    }
                    else
                        send400(res);                        
                    break;                                                     
            }
        }

        // Send 404 response if url path and/or method are invalid
        else {
            send404(res); 
        }
    }

    // Send 500 response if there was a server-side error
    catch(error) {
        send500(res);
    }        

}