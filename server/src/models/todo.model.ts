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
  created_at: Date;
  updated_at: Date;
}

async function getAll(email: string) {
  let result: TodoType[] | JsonError | any = null;
  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const user: UserType = await trx(userModel.TABLE_NAME)
        .where("email", email)
        .first();

      const todoList: TodoType[] = await trx(TABLE_NAME).where(
        "user_id",
        user.id
      );

      result = todoList;
    });
  } catch (error) {
    if (error instanceof Error) {
      result = {
        status: 500,
        message: error.message,
      };
    }
  }

  return result;
}

async function createTodo(
  newTodo: TodoType,
  userEmail: string
): Promise<TodoType[] | JsonError | any> {
  let result: TodoType[] | JsonError | any = null;
  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const user: UserType = await trx(userModel.TABLE_NAME)
        .select("*")
        .where("email", userEmail)
        .first();

      const todoWithUser = Object.assign(newTodo, {
        user_id: user.id,
        created_at: new Date(),
        updated_at: new Date(),
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

async function editTodoById(id: number, email: string, todoBody: TodoType) {
  let result: TodoType[] | JsonError | any = null;

  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const updateResult = await trx(TABLE_NAME)
        .update({
          ...todoBody,
          updated_at: new Date(),
        })
        .where("id", id);
    });
  } catch (error) {
    if (error instanceof Error) {
      result = {
        status: 500,
        message: error.message,
      };
    }
  }

  result = await getAll(email);

  return result;
}

const todoModel = {
  getAll,
  createTodo,
  editTodoById,
};

export default todoModel;
