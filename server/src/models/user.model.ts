import { Knex } from "knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

import { database } from "../db/knexfile";
import { JsonError } from "../utils/errorbuilder";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenGenerators";

export interface UserType {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
interface JwtPayload {
  email: string;
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

          const res = await trx
            .insert({
              refresh_token: refreshToken,
              created_at: new Date(),
              updated_at: new Date(),
            })
            .into("refresh_token_tbl");

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

async function refreshToken(token: string) {
  let result: JsonError | any = null;

  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const refreshToken = await trx
        .select("*")
        .from("refresh_token_tbl")
        .where("refresh_token", token)
        .first();

      if (!refreshToken) {
        result = {
          status: 400,
          message: "Invalid token",
        };
      } else {
        await jwt.verify(
          token,
          process.env.REFRESH_TOKEN_SECRET as string,
          async (err, res) => {
            if (err) {
              result = {
                status: 401,
                message: "Unauthorized",
              };
              await trx("refresh_token_tbl").del().where("id", refreshToken.id);
              return;
            }
            const { email } = jwt.decode(token) as JwtPayload;
            const newAccessToken = generateAccessToken({ email } as UserType);
            const newRefreshToken = generateRefreshToken({ email } as UserType);

            const editTokenResult = await trx("refresh_token_tbl")
              .update({
                refresh_token: newRefreshToken,
                updated_at: new Date(),
              })
              .where("id", refreshToken.id);

            result = {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            };
          }
        );
      }
    });
  } catch (error) {
    if (error instanceof Error)
      result = result = {
        status: 500,
        message: error.message,
      };
  }

  return result;
}

async function logout(token: string) {
  let result: any;
  try {
    await database.transaction(async (trx: Knex.Transaction) => {
      const refreshToken = await trx
        .select("*")
        .from("refresh_token_tbl")
        .where("refresh_token", token)
        .first();

      if (!refreshToken) {
        result = {
          status: 400,
          message: "Invalid token",
        };
      } else {
        const deleteResult = await trx("refresh_token_tbl")
          .del()
          .where("id", refreshToken.id);

        result = {
          status: 204,
          message: "logged out successfully",
        };
      }
    });
  } catch (error) {
    if (error instanceof Error)
      result = result = {
        status: 500,
        message: error.message,
      };
  }
  return result;
}

const userModel = {
  tableName,
  login,
  refreshToken,
  logout,
};

export default userModel;
