import { Knex } from "knex";

import { database } from "../db/knexfile";

import { JsonError } from "../utils/errorbuilder";

export interface UserType {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

const tableName: string = "users_tbl";

async function login(
  email: string,
  password: string
): Promise<UserType | JsonError | null> {
  let user: UserType | JsonError | null = null;
  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const zoomedUser: UserType = await trx
        .select("*")
        .from(tableName)
        .where("email", email)
        .and.where("password", password)
        .first();

      console.log(zoomedUser);

      if (!zoomedUser) {
        user = {
          status: 401,
          message: "Wrong user credentials!",
        };
      } else {
        user = zoomedUser;
      }
    });
  } catch (error) {
    // If we get here, that means that neither the 'Old Books' catalogues insert,
    // nor any of the books inserts will have taken place.
    console.error(error);
    if (error instanceof Error)
      return {
        status: 500,
        message: error.message,
      };
  }
  return user;
}

const userModel = {
  tableName,
  login,
}

export default userModel;
