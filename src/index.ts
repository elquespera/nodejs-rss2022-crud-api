import { createServer } from 'http';
import { serverListener, PORT } from './server.js';


export const runServer = () => {
    const server = createServer(serverListener);
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));    
} 


runServer();


