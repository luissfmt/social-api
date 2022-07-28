import { POST_TYPES } from "../types/post";

export class PostModel {
    constructor (
        private id: string,
        private userId: string,
        private image: string,
        private description: string,
        private createdAt: string,
        private type: POST_TYPES
    ) {};

    public static toPostModel = (object: any): PostModel => {
        return new PostModel(
            object.id,
            object.userId,
            object.image,
            object.description,
            object.createdAt,
            object.type
        );
    };

    public getId = (): string => this.id;

    public getUserId = (): string => this.userId;

    public getImage = (): string => this.image;

    public getDescription = (): string => this.description;

    public getCreatedAt = (): string => this.createdAt;

    public getType = (): POST_TYPES => this.type;
};