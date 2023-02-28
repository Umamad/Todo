import { Knex } from "knex";

import { TodoType } from "../../models/todo.model";
import { PriorityType } from "../migrations/20230217100351_create_todo_table";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("todo_tbl").del();

  const data = [];
  for (let idx = 0; idx < 200; idx++) {
    const priorities = [
      PriorityType.low,
      PriorityType.medium,
      PriorityType.high,
    ];
    const randomPriority = priorities[Math.floor(Math.random() * 3)];
    const todo = {
      title: `Title ${idx + 1}`,
      user_id: Math.floor(Math.random() * 5) + 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo justo, pretium eu placerat eget, mollis pellentesque elit. Donec semper magna dolor, vitae lacinia lacus tempor non. Cras sed varius turpis. Aliquam dignissim ut urna non porta. Quisque id justo ullamcorper lorem euismod dignissim eu a lacus. Ut porta non felis aliquet interdum. Vestibulum non dolor a metus venenatis gravida in a libero.",
      priority: randomPriority,
      created_at: new Date(),
      updated_at: new Date(),
    };

    data.push(todo)
  }

  // Inserts seed entries
  await knex("todo_tbl").insert(data);
}
