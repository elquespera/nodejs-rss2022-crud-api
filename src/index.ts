import { UserAccount, User } from './user';
import { Users } from './users';

const user:User = new UserAccount('Name', 22, []);

const users = new Users();

console.log(user);