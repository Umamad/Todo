import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import userModel, { UserType } from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
  setRefreshTokens,
} from "../utils/tokenGenerators";

interface JwtPayload {
  email: string;
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userModel.login(email, password);

  if (req.session) req.session.user = user;

  return res.json(user);
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

const userController = {
  login,
  refreshUser,
};

export default userController;
