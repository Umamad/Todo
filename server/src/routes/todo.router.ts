import express from "express";

import todoController from "../controllers/todo.controller";

const todoRouter = express.Router();

/*
 * @swagger
 * components:
 *  schemes:
 *   Todo:
 *    type: object
 *    required:
 *      - title
 *      - priority
 *    properties:
 *      id:
 *        type: number
 *        description: Uniq identity of todo
 *      title:
 *        type: string
 *        description: The title of todo
 *      is_done:
 *        type: boolean
 *        description: Status of todo
 *      priority:
 *        type: Enum
 *        description: Priority of todo
 *      created_at:
 *        type: Date
 *        description: Creation date of todo
 *      updated_at:
 *        type: Date
 *        description: Last modified date of todo
 *    example:
 *      id: 1,
 *      title: swagger todo
 *      is_done: false
 *      priority: high
 *      created_at: new Date()
 *      updated_at: new Date()
 */

todoRouter.get('/', todoController.getAll);
todoRouter.post('/', todoController.postTodo);
todoRouter.patch('/:id', todoController.patchTodo);
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;