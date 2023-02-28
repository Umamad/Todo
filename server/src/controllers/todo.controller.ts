import { Request, Response } from "express";

import todoMode from "../models/todo.model";

async function getAll(req: Request, res: Response) {
  if (req.session) {
    const { email } = req.session.user;
    const result = await todoMode.getAll(email);
    return res.status(200).json(result);
  }
}

async function postTodo(req: Request, res: Response) {
  if (!req.body.title || !req.body.priority) {
    return res.status(400).json({
      message: "invalid todo",
    });
  }

  if (req.session) {
    const { email } = req.session.user;
      const result = await todoMode.createTodo(req.body, email);
      return res.status(result.status ? result.status : 201).json(result)
  }
}

const todoController = {
  getAll,
  postTodo,
};

export default todoController;
