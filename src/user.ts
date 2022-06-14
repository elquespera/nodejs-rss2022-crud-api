import { randomUUID } from 'crypto';

// User Class that automatically adds an id

export class User {
    id: string;
    name!: string;
    age!: number;
    hobbies!: Array<string>;
    constructor(name: string, age: number, hobbies: Array<string>) {
        this.id = randomUUID({ disableEntropyCache: true });
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }
}