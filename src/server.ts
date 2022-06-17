import { createServer, IncomingMessage, ServerResponse } from 'http';

import { Users } from './users.js';
import { sendMessage, sendMessageIfDefined, send400, 
         send404, send500, ERROR_400_FIELD } from './messages.js';
import { parseRequest, RequestParams, API_ROUTE } from './request.js';

import 'dotenv/config';
import { parse } from 'dotenv';

const users = new Users();


// Try to import PORT from .env file,
// if not, default to 5000
const PORT = process.env.PORT || 5000;


// Process events from http Server
const serverListener = async (req: IncomingMessage, res: ServerResponse) => {

    const isPathValid = (path: string, method: string): boolean => {
        return ((path === API_ROUTE && ['GET', 'POST'].includes(method)) ||
                (path === API_ROUTE + '/' && ['GET', 'PUT', 'DELETE'].includes(method))); 
    }

    try {
        // Read body data
        const buffer = [];
        for await (const chunk of req) {
            buffer.push(chunk);
        }
        const body = Buffer.concat(buffer).toString();

        const data: RequestParams = parseRequest(req, body);

        // Check if path is valid for a given method
        if (isPathValid(data.path, req.method)) {

            // Method Switch
            switch (req.method) {
                case 'GET':
                    if (data.path === API_ROUTE) {
                        sendMessage(res, 200, users.getAllUsers());
                    }
                    else {              
                        if (data.id) {
                            sendMessageIfDefined(res, 200, data.id, users.getUser(data.id));
                        } else 
                            send400(res);
                    }
                    break;

                case 'POST': 
                    if (data.data) {
                        sendMessage(res, 201, users.update(data.data, true));
                    }
                    else
                        send400(res, ERROR_400_FIELD);
                    break;   

                case 'PUT': 
                    if (data.id) {
                        if (data.data) {
                            data.data.id = data.id;
                            sendMessageIfDefined(res, 200, data.id, users.update(data.data));
                        } else {
                            send400(res, ERROR_400_FIELD);
                        }
                    } else 
                        send400(res);
                    
                    break;  

                case 'DELETE':
                    if (data.id) {
                        sendMessageIfDefined(res, 204, data.id, users.delete(data.id));
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



const runServer = (silent = false) => {
    const server = createServer(serverListener);
    server.listen(PORT, () => {
        if (!silent)
            console.log(`Server running on port ${PORT}`)
    });  
    return server;  
}

export default runServer;