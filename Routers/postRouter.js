const { Router } = require("express");
const route = Router();
const postController = require("../Controllers/postController");
const auth = require("../Middlewares/auth");

route.post("/api/post/create", auth, postController.create);
route.patch("/api/post/update/:pid", auth, postController.update);
route.delete("/api/post/delete/:pid", auth, postController.delete);
route.get("/api/post/", postController.getAllPosts);
route.get("/api/post/:pid", postController.getPostById);
route.get("/api/post/myPosts", auth, postController.getMyPosts);

module.exports = route;