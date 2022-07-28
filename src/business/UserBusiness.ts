import { UserDatabase } from "../data/UserDatabase";
import { UserModel } from "../models/UserModel";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LogInDTO, SignUpDTO } from "../types/user";

export class UserBusiness {
    constructor (
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private userDatabase: UserDatabase,
        private authenticator: Authenticator
        
    ) {};

    public createUser = async (output: SignUpDTO): Promise<string> => {
        try {
            const { name, email, password } = output;

            if (
                !name ||
                !email ||
                !password
            ) {
                throw new Error("Por favor, preencha os campos");
            }

            if (email.indexOf("@") === -1) {
                throw new Error("Email inválido");
            }

            if (password.length < 6) {
                throw new Error("Senha inválida");
            }

            const emailExists = await this.userDatabase.selectUserByEmail(email);

            if (emailExists) {
                throw new Error("Email já cadastrado no sistema");
            }

            const id: string = this.idGenerator.generateId();
            const hashPassword: string = await this.hashManager.generateHash(password);
            const newUser: UserModel = new UserModel(
                id,
                name,
                email,
                hashPassword
            );

            await this.userDatabase.insertUser(newUser);

            const token: string = this.authenticator.generateToken({ id });

            return token;
            
        } catch (error: any) {
            throw new Error(error.message || "Erro ao criar usuário");
        }
    };

    public loginUser = async (userLogin: LogInDTO): Promise<string> => {
        try {
            const { email, password } = userLogin;

            if (!email || !password) {
                throw new Error("Por favor, preencha os campos");
            }

            if (email.indexOf("@") === -1) {
                throw new Error("Email inválido");
            }

            const user = await this.userDatabase.selectUserByEmail(email);
            

            if(!user) {
                throw new Error("Email não cadastrado no sistema");
            }

            const hashCompare = await this.hashManager.compareHash(
                password,
                user.getPassword()
            );

            if(!hashCompare) {
                throw new Error("Senha incorreta");
            }

            const token: string = this.authenticator.generateToken({ id: user.getId() });

            return token;

        } catch (error: any) {
            throw new Error(error.message || "Erro ao logar usuário");
        }
    };
};