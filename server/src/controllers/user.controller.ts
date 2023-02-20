import { Request, Response } from "express";

import userModel from "../models/user.model";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userModel.login(email, password);

  // res.cookie("session", JSON.stringify(user))
  if (req.session) req.session.user = user;

  return res.json(user);
}

async function get(req: Request, res: Response) {
  console.log(req.session);
  if (req.session) return res.json(req.session.user);
}

const userController = {
  login,
  get,
};

export default userController;
