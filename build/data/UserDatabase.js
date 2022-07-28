"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
const Database_1 = require("./Database");
const UserModel_1 = require("../models/UserModel");
class UserDatabase extends Database_1.Database {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "User_Labook";
        this.selectUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [user] = yield this.getConnection()
                    .select()
                    .from(this.TABLE_NAME)
                    .where({ email });
                return user && UserModel_1.UserModel.toUserModel(user);
            }
            catch (error) {
                throw new Error(error.sqlMessage || "Erro ao buscar email no banco de dados");
            }
        });
        this.insertUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { getId, getName, getEmail, getPassword } = user;
                yield this.getConnection()
                    .insert({
                    id: getId(),
                    name: getName(),
                    email: getEmail(),
                    password: getPassword()
                })
                    .into(this.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || "Erro ao inserir usuário no banco de dados");
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
;
//# sourceMappingURL=UserDatabase.js.map