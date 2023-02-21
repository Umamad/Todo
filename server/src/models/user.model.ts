import { Knex } from "knex";
import bcrypt from "bcrypt";

import { database } from "../db/knexfile";

import { JsonError } from "../utils/errorbuilder";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenGenerators";

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
): Promise<any | JsonError> {
  let user: UserType | JsonError | any = null;
  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const zoomedUser: UserType = await trx
        .select("email", "password")
        .from(tableName)
        .where("email", email)
        .first();

      if (!zoomedUser) {
        user = {
          status: 404,
          message: "There is no such a user",
        };
      } else {
        const correctPassword = await bcrypt.compare(
          password,
          zoomedUser.password
        );

        if (correctPassword) {
          const { password, ...restZoomedUser } = zoomedUser;
          const accessToken = generateAccessToken(restZoomedUser as UserType);
          const refreshToken = generateRefreshToken(restZoomedUser as UserType);
          user = { ...restZoomedUser, accessToken, refreshToken } as any;
        } else {
          user = {
            status: 401,
            message: "Wrong password!",
          };
        }
      }
    });
  } catch (error) {
    // If we get here, that means that neither the 'Old Books' catalogues insert,
    // nor any of the books inserts will have taken place.
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
};

export default userModel;
