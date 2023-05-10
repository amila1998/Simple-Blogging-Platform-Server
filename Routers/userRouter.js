const { Router } = require("express");
const route = Router();
const userController = require("../Controllers/userController");
const auth = require("../Middlewares/auth");

route.post("/api/auth/register", userController.register);
route.post("/api/auth/signing", userController.signing);
route.post("/api/auth/access", userController.access);
route.get("/api/auth/user", auth, userController.info);
route.patch("/api/auth/user_update", auth, userController.update);
route.get("/api/auth/signout", userController.signout);

module.exports = route;