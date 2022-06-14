import { IncomingMessage, ServerResponse } from 'http';

import 'dotenv/config';

// Try to import PORT from .env file,
// if not, default to 5000
export const PORT = process.env.PORT || 5000;

// Process events from http Server
export const serverListener = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === 'api/users') {

    }
    else {
        console.log(req.url, req.method, 'a');
        res.end();    
    }
}