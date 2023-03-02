import { Request, Response } from "express";

import todoModel from "../models/todo.model";

async function getAll(req: Request, res: Response) {
  if (req.session) {
    const { email } = req.session.user;
    const result = await todoModel.getAll(email);
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
    const result = await todoModel.createTodo(req.body, email);
    return res.status(result.status ? result.status : 201).json(result);
  }
}

async function patchTodo(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json({
      message: "Invalid id",
    });

  if (req.session) {
    const { email } = req.session.user;
    const result = await todoModel.editTodoById(id, email, { ...req.body });

    return res.status(result.status ? result.status : 200).json(result);
  }
}

const todoController = {
  getAll,
  postTodo,
  patchTodo,
};

export default todoController;
