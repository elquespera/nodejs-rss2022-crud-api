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

    add(name: string, age: number, hobbies: Array<string>): User {
        this.users.push({
            id: uuidv4(),
            name,
            age,
            hobbies
        });
        return this.users[this.users.length - 1];
    }

    update(user: User, add: boolean = false): User {
        if (!user) return undefined;
        if (add) {
            this.users.push({ 
                id: uuidv4(), 
                name: user.name,
                age: user.age,
                hobbies: user.hobbies 
            });
            return this.users[this.users.length - 1];
        } else {
            const index = this.findUser(user.id);
            if (index >= 0) {
                this.users[index].name = user.name;
                this.users[index].age = user.age;
                this.users[index].hobbies = user.hobbies;
                return user;
            } else {
                return undefined;
            }
        }
    }

    delete(id: string): boolean {
        const index = this.findUser(id);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
        return index >= 0;
    }
}