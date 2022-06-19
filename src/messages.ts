import { ServerResponse } from 'http';


const ERROR_400_ID = 'User ID provided is not valid.';
const ERROR_400_FIELD = 'The request does not contain required fields for new user or their values are invalid.';

const ERROR_404_PAGE = 'Requested page not found.';
const ERROR_404_USER = (id: string): string => `The user with ID=${id} not found.`;

const ERROR_500 = 'An error occurred during request handling by server.'

const sendMessage = (res: ServerResponse, code: number, msg?: any) => {
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(JSON.stringify(msg));
}

// Page or User ID not found
const send404 = (res: ServerResponse, msg: string = ERROR_404_PAGE) => {
    sendMessage(res, 404, msg);
}

// User ID invalid
const send400 = (res: ServerResponse, msg: string = ERROR_400_ID) => {
    sendMessage(res, 400, msg);
}

// Server side error

const send500 = (res: ServerResponse, msg: string = ERROR_500) => {
    sendMessage(res, 500, msg);
}

// Send Message only if body is defined, else send user not found
const sendMessageIfDefined = (res: ServerResponse, code: number, userID: string, body?: any) => {
    if (body) 
        sendMessage(res, code, body);
    else
        send404(res, ERROR_404_USER(userID));
}



export { sendMessage, send400, send404, send500, sendMessageIfDefined, ERROR_400_FIELD }