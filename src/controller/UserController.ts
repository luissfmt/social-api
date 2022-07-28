import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LogInDTO, SignUpDTO } from "../types/user";

export class UserController {
    constructor (
        private userBusiness: UserBusiness
    ) {};

    public signUp = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password } = req.body;

            const input: SignUpDTO = {
                name,
                email,
                password
            };

            const token: string = await this.userBusiness.createUser(input);

            res.status(201).send({
                message: "Usuário cadastrado com sucesso",
                token
            });

        } catch (error: any) {
            res.status(res.statusCode !== 200 ? res.statusCode : 500).send({ error: error.message });
        }
    };

    public logIn = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            const input: LogInDTO = {
                email,
                password
            };

            const token: string = await this.userBusiness.loginUser(input);

            res.status(200).send({
                message: "Login realizado com sucesso",
                token
            });
            
        } catch (error: any) {
            res.status(res.statusCode !== 200 ? res.statusCode : 400).send({ error: error.message });
        }
    };
};