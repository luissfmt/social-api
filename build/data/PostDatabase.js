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
exports.PostDatabase = void 0;
const PostModel_1 = require("../models/PostModel");
const Database_1 = require("./Database");
class PostDatabase extends Database_1.Database {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "Post_Labook";
        this.insertPost = (post) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { getId, getUserId, getImage, getDescription, getCreatedAt, getType } = post;
                yield this.getConnection()
                    .insert({
                    id: getId(),
                    userId: getUserId(),
                    image: getImage(),
                    description: getDescription(),
                    createdAt: getCreatedAt(),
                    type: getType()
                })
                    .into(this.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || "Erro ao inserir post no banco de dados");
            }
        });
        this.selectPostById = (postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [post] = yield this.getConnection()
                    .select()
                    .from(this.TABLE_NAME)
                    .where({ id: postId });
                return post && PostModel_1.PostModel.toPostModel(post);
            }
            catch (error) {
                throw new Error(error.sqlMessage || "Erro ao buscar post por ID no banco de dados");
            }
        });
    }
}
exports.PostDatabase = PostDatabase;
;
//# sourceMappingURL=PostDatabase.js.map