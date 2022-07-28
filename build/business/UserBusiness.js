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
exports.UserBusiness = void 0;
const UserModel_1 = require("../models/UserModel");
class UserBusiness {
    constructor(idGenerator, hashManager, userDatabase, authenticator) {
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.userDatabase = userDatabase;
        this.authenticator = authenticator;
        this.createUser = (output) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = output;
                if (!name ||
                    !email ||
                    !password) {
                    throw new Error("Por favor, preencha os campos");
                }
                if (email.indexOf("@") === -1) {
                    throw new Error("Email inválido");
                }
                if (password.length < 6) {
                    throw new Error("Senha inválida");
                }
                const emailExists = yield this.userDatabase.selectUserByEmail(email);
                if (emailExists) {
                    throw new Error("Email já cadastrado no sistema");
                }
                const id = this.idGenerator.generateId();
                const hashPassword = yield this.hashManager.generateHash(password);
                const newUser = new UserModel_1.UserModel(id, name, email, hashPassword);
                yield this.userDatabase.insertUser(newUser);
                const token = this.authenticator.generateToken({ id });
                return token;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao criar usuário");
            }
        });
        this.loginUser = (userLogin) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = userLogin;
                if (!email || !password) {
                    throw new Error("Por favor, preencha os campos");
                }
                if (email.indexOf("@") === -1) {
                    throw new Error("Email inválido");
                }
                const user = yield this.userDatabase.selectUserByEmail(email);
                if (!user) {
                    throw new Error("Email não cadastrado no sistema");
                }
                const hashCompare = yield this.hashManager.compareHash(password, user.getPassword());
                if (!hashCompare) {
                    throw new Error("Senha incorreta");
                }
                const token = this.authenticator.generateToken({ id: user.getId() });
                return token;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao logar usuário");
            }
        });
    }
    ;
}
exports.UserBusiness = UserBusiness;
;
//# sourceMappingURL=UserBusiness.js.map