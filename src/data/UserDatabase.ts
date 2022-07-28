import { Database } from "./Database";
import { UserModel } from "../models/UserModel";

export class UserDatabase extends Database{
    private TABLE_NAME: string = "User_Labook";
    
    public selectUserByEmail = async (email: string): Promise<UserModel> => {
        try {
            const [user] = await this.getConnection()
            .select()
            .from(this.TABLE_NAME)
            .where({ email });
            
            return user && UserModel.toUserModel(user);

        } catch (error: any) {
            throw new Error(error.sqlMessage || "Erro ao buscar email no banco de dados");
        }
    };

    public insertUser = async (user: UserModel): Promise<void> => {
        try {
            const { getId, getName, getEmail, getPassword } = user;

            await this.getConnection()
            .insert({
                id: getId(),
                name: getName(),
                email: getEmail(),
                password: getPassword()
            })
            .into(this.TABLE_NAME);

        } catch (error: any) {
            throw new Error(error.sqlMessage || "Erro ao inserir usuário no banco de dados");
        }
    };
};