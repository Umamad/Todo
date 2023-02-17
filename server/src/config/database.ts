import knex from "knex";

import config from "../db/knexfile";

const database = knex(config['development']);

export default database;
