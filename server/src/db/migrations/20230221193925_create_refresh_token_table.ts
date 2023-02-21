import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "refresh_token_tbl",
    (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary();
      table.string("refresh_token", 255).unique();
      table.timestamps();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("refresh_token_tbl");
}
