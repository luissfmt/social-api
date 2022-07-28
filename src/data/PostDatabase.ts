import { PostModel } from "../models/PostModel";
import { Database } from "./Database";

export class PostDatabase extends Database {
    private TABLE_NAME: string = "Post_Labook";

    public insertPost = async (post: PostModel): Promise<void> => {
        try {
            const {
                getId,
                getUserId,
                getImage,
                getDescription,
                getCreatedAt,
                getType
            } = post;

            await this.getConnection()
            .insert({
                id: getId(),
                userId: getUserId(),
                image: getImage(),
                description: getDescription(),
                createdAt: getCreatedAt(),
                type: getType()
            })
            .into(this.TABLE_NAME)

        } catch (error: any) {
            throw new Error(error.sqlMessage || "Erro ao inserir post no banco de dados");
        }
    };

    public selectPostById = async (postId: string): Promise<PostModel> => {
        try {
            const [post] = await this.getConnection()
            .select()
            .from(this.TABLE_NAME)
            .where({ id: postId });

            return post && PostModel.toPostModel(post);

        } catch (error: any) {
            throw new Error(error.sqlMessage || "Erro ao buscar post por ID no banco de dados");
        }
    };
};