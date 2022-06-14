import { createServer } from 'http';

import { serverListener, PORT } from './server';

const server = createServer(serverListener);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// import { Users } from './users';


// const users = new Users();

// users.add('Name', 22, []);
// users.add('Second User', 45, []);
// users.add('Name', 45, ['Some hobby', 'Skiing']);

// console.log(users.getAllUsers());