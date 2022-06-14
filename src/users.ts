import { User } from "./user";

export class Users {
    users: Array<User> = [];

    constructor() {

    }

    getUser(id: string) {

    }

    getAllUsers() {

    }

    add(user: User) {
        this.users.push(user);
    }

    update(user: User): boolean {
        return false;
    }

    delete(id: string) {

    }
}