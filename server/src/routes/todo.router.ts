import express from "express";

import todoController from "../controllers/todo.controller";

const todoRouter = express.Router();

todoRouter.get('/', todoController.getAll);
todoRouter.post('/', todoController.postTodo);
todoRouter.patch('/:id', todoController.patchTodo);
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;