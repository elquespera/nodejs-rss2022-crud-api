import { createServer } from 'http';

import { serverListener, PORT } from './server';

const server = createServer(serverListener);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));