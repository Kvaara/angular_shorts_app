interface IUser {
    name: string;
    email: string;
    age: number;
    phoneNumber: string;
    password?: string | undefined;
}

export class User implements IUser {
    name: string;
    email: string;
    age: number;
    phoneNumber: string;
    password?: string | undefined;

    constructor(
        name: string,
        email: string,
        age: number,
        phoneNumber: string,
        password?: string | undefined,
    ) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}
