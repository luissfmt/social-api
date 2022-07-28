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
exports.UserController = void 0;
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const input = {
                    name,
                    email,
                    password
                };
                const token = yield this.userBusiness.createUser(input);
                res.status(201).send({
                    message: "Usuário cadastrado com sucesso",
                    token
                });
            }
            catch (error) {
                res.status(res.statusCode !== 200 ? res.statusCode : 500).send({ error: error.message });
            }
        });
        this.logIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const input = {
                    email,
                    password
                };
                const token = yield this.userBusiness.loginUser(input);
                res.status(200).send({
                    message: "Login realizado com sucesso",
                    token
                });
            }
            catch (error) {
                res.status(res.statusCode !== 200 ? res.statusCode : 400).send({ error: error.message });
            }
        });
    }
    ;
}
exports.UserController = UserController;
;
//# sourceMappingURL=UserController.js.map