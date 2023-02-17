import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "users_tbl",
    function (table: Knex.CreateTableBuilder) {
      table.increments("id", {
        primaryKey: true,
      });
      table.string("email", 255).unique();
      table.string("password", 255);
      table.timestamps();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users_tbl");
}
