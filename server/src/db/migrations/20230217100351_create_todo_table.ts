import { Knex } from "knex";
export enum PriorityType {
  low = "low",
  medium = "medium",
  high = "high",
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "todo_tbl",
    function (table: Knex.CreateTableBuilder) {
      table.increments("id", {
        primaryKey: true,
      });
      table.integer("user_id").unsigned();
      table.string("title", 255);
      table.text("description").nullable();
      table.boolean("is_done").defaultTo(false);
      table
        .enu("priority", [
          PriorityType.high,
          PriorityType.medium,
          PriorityType.low,
        ])
        .defaultTo(PriorityType.medium);

      table.timestamps();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("todo_tbl");
}
