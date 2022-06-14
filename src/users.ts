import { randomUUID } from 'crypto';

import { User } from "./user";

export class Users {
    users: Array<User> = [];

    constructor() {

    }

    getUser(id: string) {

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

    update(user: User): boolean {
        return false;
    }

    delete(id: string) {

    }
}