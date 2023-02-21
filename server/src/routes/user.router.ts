import express from "express";

import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.patch('/refresh-token', userController.refreshUser);

export default userRouter;