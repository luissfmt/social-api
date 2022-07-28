export enum POST_TYPES {
    NORMAL = "Normal",
    EVENT = "Evento"
};

export interface PostCreationDTO {
    image: string,
    description: string,
    type: POST_TYPES,
    userToken: string
};

export interface GetPostByIdDTO {
    id: string
}