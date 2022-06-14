import { v4 as uuidv4 } from 'uuid';

import { User } from "./user";

export class Users {
    users: Array<User> = [];

    constructor() {

    }

    findUser(id: string): number {
        return this.users.findIndex(user => user.id === id);
    }

    getUser(id: string): User {
        return this.users[this.findUser(id)];
    }

    getAllUsers(): Array<User> {
        return this.users;
    }

    add(name: string, age: number, hobbies: Array<string>) {
        this.users.push({
            id: uuidv4(),
            name,
            age,
            hobbies
        });
    }

    update(id: string, name: string, age: number, hobbies: Array<string>) {
        const index = this.findUser(id);
        if (index >= 0) {
            this.users[index].name = name;
            this.users[index].age = age;
            this.users[index].hobbies = hobbies;
        }
    }

    delete(id: string) {
        const index = this.findUser(id);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }
}