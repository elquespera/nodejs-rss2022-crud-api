import { ServerResponse } from 'http';


const ERROR_400 = 'User ID provided is not valid';

const ERROR_404_PAGE = 'Requested page not found';
const ERROR_404_USER = (id: string): string => `The user with ID=${id} not found`;

const sendMessage = (code: number, msg: any, res: ServerResponse) => {
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(JSON.stringify(msg));
}

// Page or User ID not found
const send404 = (res: ServerResponse, msg?: string) => {
    sendMessage(404, msg || ERROR_404_PAGE, res);
}

// User ID invalid
const send400 = (res: ServerResponse) => sendMessage(400, ERROR_400, res);



export { sendMessage, send400, send404, ERROR_404_USER }