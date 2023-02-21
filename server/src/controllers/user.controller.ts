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
  if (!refreshTokens.includes(req.body.token))
    res.status(400).send("Refresh Token Invalid");

  const newRefreshTokens = refreshTokens.filter((c) => c != req.body.token);
  setRefreshTokens(newRefreshTokens);

  const { email } = jwt.decode(req.body.token) as JwtPayload;

  // remove the old refreshToken from the refreshTokens list
  const accessToken = generateAccessToken({
    email,
  } as UserType);
  const refreshToken = generateRefreshToken({
    email,
  } as UserType);
  //generate new accessToken and refreshTokens
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
}

const userController = {
  login,
  refreshUser,
};

export default userController;
