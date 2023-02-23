import express from "express";

import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.patch('/refresh-token', userController.refreshUser);
userRouter.delete('/logout', userController.logout)

export default userRouter;