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
exports.PostBusiness = void 0;
const PostModel_1 = require("../models/PostModel");
const post_1 = require("../types/post");
class PostBusiness {
    constructor(authenticator, idGenerator, postDatabase) {
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.postDatabase = postDatabase;
        this.createPost = (post) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { image, description, type, userToken } = post;
                if (!image ||
                    !description ||
                    !type) {
                    throw new Error("Por favor, preencha os campos");
                }
                if (description.length < 1) {
                    throw new Error("Por favor, insira uma descrição");
                }
                if (type !== post_1.POST_TYPES.EVENT &&
                    type !== post_1.POST_TYPES.NORMAL) {
                    throw new Error("Tipo do post deve variar entre 'Normal' ou 'Evento'");
                }
                const userData = this.authenticator.getTokenData(userToken);
                if (!userData) {
                    throw new Error("Permissão de usuário inválida");
                }
                const id = this.idGenerator.generateId();
                const createdAt = new Date().toISOString().substring(0, 10);
                const newPost = new PostModel_1.PostModel(id, userData.id, image, description, createdAt, type);
                yield this.postDatabase.insertPost(newPost);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao criar post");
            }
        });
        this.getPostById = (postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = postId;
                if (!id) {
                    throw new Error("Id inválido");
                }
                const postData = this.postDatabase.selectPostById(id);
                if (!postData) {
                    throw new Error("Post não encontado");
                }
                return postData;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao pegar post por ID");
            }
        });
    }
    ;
}
exports.PostBusiness = PostBusiness;
;
//# sourceMappingURL=PostBusiness.js.map