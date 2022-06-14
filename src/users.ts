import { randomUUID } from 'crypto';

import { User } from "./user";

export class Users {
    users: Array<User> = [];

    constructor() {

    }

    getUser(id: string) {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): Array<User> {
        return this.users;
    }

    add(name: string, age: number, hobbies: Array<string>) {
        this.users.push({
            id: randomUUID({ disableEntropyCache: true }),
            name,
            age,
            hobbies
        });
    }

    update(user: User) {

    }

    delete(id: string) {

    }
}