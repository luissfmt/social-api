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
exports.PostController = void 0;
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { image, description, type } = req.body;
                const userToken = req.headers.authorization;
                const input = {
                    image,
                    description,
                    type,
                    userToken
                };
                yield this.postBusiness.createPost(input);
                res.status(201).send({ message: "Post criado com sucesso!" });
            }
            catch (error) {
                res.status(res.statusCode !== 200 ? res.statusCode : 500).send({ error: error.message });
            }
        });
        this.getPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const input = { id };
                const post = yield this.postBusiness.getPostById(input);
                res.status(200).send({ post });
            }
            catch (error) {
                res.status(res.statusCode !== 200 ? res.statusCode : 500).send({ error: error.message });
            }
        });
    }
    ;
}
exports.PostController = PostController;
;
//# sourceMappingURL=PostController.js.map