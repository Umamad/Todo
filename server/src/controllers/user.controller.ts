import { Request, Response } from "express";

import userModel from "../models/user.model";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userModel.login(email, password);

  if (req.session) req.session.user = user;

  return res.status(user.status ? user.status : 200).json(user);
}

async function refreshUser(req: Request, res: Response) {
  if (!req.body.token)
    return res.status(400).json({
      status: 400,
      message: "Invalid token",
    });

  const result = await userModel.refreshToken(req.body.token);

  return res.status(result.status ? result.status : 200).json(result);
}

async function logout(req: Request, res: Response) {
  if (!req.body.token)
    return res.status(400).json({
      status: 400,
      message: "Invalid token",
    });

  const result = await userModel.logout(req.body.token);

  return res.status(result.status ? result.status : 200).json(result);
}

const userController = {
  login,
  refreshUser,
  logout,
};

export default userController;
