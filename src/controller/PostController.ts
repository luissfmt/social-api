import { Request, Response } from "express";

import { PostBusiness } from "../business/PostBusiness";

import { GetPostByIdDTO, PostCreationDTO } from "../types/post";

export class PostController {
    constructor (
        private postBusiness: PostBusiness
    ) {};

    public createPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const { image, description, type } = req.body;
            const userToken = req.headers.authorization as string;

            const input: PostCreationDTO = {
                image,
                description,
                type,
                userToken
            };

            await this.postBusiness.createPost(input);

            res.status(201).send({ message: "Post criado com sucesso!" });

        } catch (error: any) {
            res.status(res.statusCode !== 200 ? res.statusCode : 500).send({ error: error.message });
        }
    };

    public getPostById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const input: GetPostByIdDTO = { id };

            const post = await this.postBusiness.getPostById(input);

            res.status(200).send({ post });  

        } catch (error: any) {
            res.status(res.statusCode !== 200 ? res.statusCode : 500).send({ error: error.message });
        }
    };
};