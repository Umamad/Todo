import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users_tbl").del();

  // Hash password
  const hashedPassword = await bcrypt.hash("hello12345", 10);

  // Inserts seed entries
  await knex("users_tbl").insert([
    { id: 1, email: "test1@gmail.com", password: hashedPassword, created_at: new Date(), updated_at: new Date() },
    { id: 2, email: "test2@gmail.com", password: hashedPassword, created_at: new Date(), updated_at: new Date() },
    { id: 3, email: "test3@gmail.com", password: hashedPassword, created_at: new Date(), updated_at: new Date() },
    { id: 4, email: "test4@gmail.com", password: hashedPassword, created_at: new Date(), updated_at: new Date() },
    { id: 5, email: "test5@gmail.com", password: hashedPassword, created_at: new Date(), updated_at: new Date() },
    { id: 6, email: "test6@gmail.com", password: hashedPassword, created_at: new Date(), updated_at: new Date() },
  ]);
}
