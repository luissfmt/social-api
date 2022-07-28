"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
class PostModel {
    constructor(id, userId, image, description, createdAt, type) {
        this.id = id;
        this.userId = userId;
        this.image = image;
        this.description = description;
        this.createdAt = createdAt;
        this.type = type;
        this.getId = () => this.id;
        this.getUserId = () => this.userId;
        this.getImage = () => this.image;
        this.getDescription = () => this.description;
        this.getCreatedAt = () => this.createdAt;
        this.getType = () => this.type;
    }
    ;
}
exports.PostModel = PostModel;
PostModel.toPostModel = (object) => {
    return new PostModel(object.id, object.userId, object.image, object.description, object.createdAt, object.type);
};
;
//# sourceMappingURL=PostModel.js.map