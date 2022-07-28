"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.getId = () => this.id;
        this.getName = () => this.name;
        this.getEmail = () => this.email;
        this.getPassword = () => this.password;
    }
    ;
}
exports.UserModel = UserModel;
UserModel.toUserModel = (object) => {
    return new UserModel(object.id, object.name, object.email, object.password);
};
;
//# sourceMappingURL=UserModel.js.map