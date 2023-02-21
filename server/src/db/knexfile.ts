import knex, { Knex } from "knex";
import { config } from "dotenv";

config();

const dbConfig: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "src/db/migrations",
      extension: ".ts",
    },
    seeds: {
      directory: "src/db/seeds",
      extension: ".ts",
    },
  },
};


export const database = knex(dbConfig["development"]);

