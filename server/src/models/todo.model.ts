import userModel, { UserType } from "./user.model";

import { PriorityType } from "../db/migrations/20230217100351_create_todo_table";
import { JsonError } from "../utils/errorbuilder";
import { database } from "../db/knexfile";
import { Knex } from "knex";

const TABLE_NAME: string = "todo_tbl";

export interface ITodo {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  priority: PriorityType;
  created_at: Date;
  updated_at: Date;
}

async function getAll(email: string) {
  let result: ITodo[] | JsonError | any = null;
  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const user: UserType = await trx(userModel.TABLE_NAME)
        .where("email", email)
        .first();

      const todoList: ITodo[] = await trx(TABLE_NAME).where(
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
  newTodo: ITodo,
  userEmail: string
): Promise<ITodo[] | JsonError | any> {
  let result: ITodo[] | JsonError | any = null;
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
      const todoList: ITodo[] = await trx(TABLE_NAME);
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

async function editTodoById(id: number, email: string, todoBody: ITodo) {
  let result: ITodo[] | JsonError | any = null;

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

async function deleteTodoById(id: number): Promise<JsonError> {
  let result: JsonError = {
    status: 400,
    message: "not valid",
  };
  try {
    const deleteResult = await database(TABLE_NAME).where("id", id).del();
    result = {
      status: 204,
      message: "deleted successfully",
    };
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

const todoModel = {
  getAll,
  createTodo,
  editTodoById,
  deleteTodoById,
};

export default todoModel;
