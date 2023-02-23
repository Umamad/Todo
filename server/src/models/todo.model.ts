import jwt from "jsonwebtoken";

import userModel, { UserType } from "./user.model";

import { PriorityType } from "../db/migrations/20230217100351_create_todo_table";
import { JsonError } from "../utils/errorbuilder";
import { database } from "../db/knexfile";
import { Knex } from "knex";

const TABLE_NAME: string = "todo_tbl";

export interface TodoType {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  priority: PriorityType;
  create_at: Date;
  updated_at: Date;
}

interface JwtPayload {
  email: string;
}

async function createTodo(newTodo: TodoType, userEmail: string): Promise<TodoType[] | JsonError | any> {
  let result: TodoType[] | JsonError | any = null;
  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const user: UserType = await trx(userModel.TABLE_NAME)
        .select("*")
        .where("email", userEmail)
        .first();

      const todoWithUser = Object.assign(newTodo, {
        user_id: user.id,
      });
      const insertResult = await trx(TABLE_NAME).insert(todoWithUser);
      const todoList: TodoType[] = await trx(TABLE_NAME);
      result = todoList;
    });
  } catch (error) {
    if (error instanceof Error)
      result = {
        status: 500,
        message: error.message,
      };
  }

  return result;
}
