import { app } from "./controller/app";

import { UserBusiness } from "./business/UserBusiness";

import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { UserDatabase } from "./data/UserDatabase";
import { Authenticator } from "./services/Authenticator";
import { UserController } from "./controller/UserController";
import { PostBusiness } from "./business/PostBusiness";
import { PostDatabase } from "./data/PostDatabase";
import { PostController } from "./controller/PostController";

// ----- INSTANCIAS DA CLASSE USER
const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new UserDatabase(),
    new Authenticator()
);

const userController = new UserController(
    userBusiness
);

// ----- INSTANCIAS DA CLASSE POST
const postBusiness = new PostBusiness(
    new Authenticator(),
    new IdGenerator(),
    new PostDatabase()
);

const postController = new PostController(
    postBusiness
);

// ----- SIGNUP -----
app.post("/user/signup", userController.signUp);

// ----- LOGIN -----
app.post("/user/login", userController.logIn);

// ----- POST CREATION -----
app.post("/post/create", postController.createPost);

// ----- GET POST BY ID -----
app.get("/post/:id", postController.getPostById);