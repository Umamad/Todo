import { Request, Response } from "express";

import UserModel from "../models/user.model";

class UserController {
  model: any = null;

  constructor() {
    this.model = new UserModel();
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    // console.log(req.body);

    const user = await new UserModel().login(email, password);
    // const user = await this.model.login(email, password);
    console.log(user);
    

    return res.json(user);
    // return res.json({ res: true, ...req.body });
  }
}

export default UserController;
