import { PostDatabase } from "../data/PostDatabase";
import { PostModel } from "../models/PostModel";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { AuthenticationData } from "../types/authentication";

import { GetPostByIdDTO, PostCreationDTO, POST_TYPES } from "../types/post";

export class PostBusiness {
    constructor (
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private postDatabase: PostDatabase
    ) {};

    public createPost = async (post: PostCreationDTO): Promise<void> => {
        try {
            const { image, description, type, userToken } = post;

            if (
                !image ||
                !description ||
                !type
            ) {
                throw new Error("Por favor, preencha os campos");
            }

            if (description.length < 1) {
                throw new Error("Por favor, insira uma descrição");
            }

            if (
                type !== POST_TYPES.EVENT &&
                type !== POST_TYPES.NORMAL
            ) {
                throw new Error("Tipo do post deve variar entre 'Normal' ou 'Evento'");
            }
            

            const userData: AuthenticationData = this.authenticator.getTokenData(userToken);

            if (!userData) {
                throw new Error("Permissão de usuário inválida");
            }

            const id: string = this.idGenerator.generateId();

            // -> gerando uma data do dia atual e transformando em string "aaaa-mm-dd"
            const createdAt: string = new Date().toISOString().substring(0, 10);

            const newPost: PostModel = new PostModel(
                id,
                userData.id,
                image,
                description,
                createdAt,
                type
            );

            await this.postDatabase.insertPost(newPost);

        } catch (error: any) {
            throw new Error(error.message || "Erro ao criar post");
        }
    };

    public getPostById = async (postId: GetPostByIdDTO): Promise<PostModel> => {
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

        } catch (error: any) {
            throw new Error(error.message || "Erro ao pegar post por ID");
        }
    };
};