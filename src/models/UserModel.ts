export class UserModel {
    constructor (
        private id: string,
        private name: string,
        private email: string,
        private password: string
    ) {};

    public static toUserModel = (object: any): UserModel => {
        return new UserModel(
            object.id,
            object.name,
            object.email,
            object.password
        );
    };

    public getId = () => this.id;

    public getName = () => this.name;

    public getEmail = () => this.email;

    public getPassword = () => this.password;
};