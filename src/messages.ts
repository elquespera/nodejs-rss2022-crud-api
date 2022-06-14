import { ServerResponse } from 'http';

const sendMessage = (code: number, msg: any, res: ServerResponse) => {
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(JSON.stringify(msg));
}


const ERROR_404 = 'Requested page not found';

const send404 = (res: ServerResponse) => sendMessage(404, ERROR_404, res);



export { sendMessage, send404 }