import { describe, test, afterAll, beforeAll } from "@jest/globals";
import supertest from "supertest";

import app from "../app";

describe("Test user api", () => {
  const BASE_URL = "/user";

  afterAll((done) => {
    done();
  });

  beforeAll((done) => {
    done();
  });

  describe("Test login api", () => {
    const LoginUrl = `${BASE_URL}/login`;

    test("Login success", async () => {
      const result = await supertest(app)
        .post(LoginUrl)
        .send({
          email: "test1@gmail.com",
          password: "hello12345",
        })
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("Login invalid user", async () => {
      const result = await supertest(app)
        .post(LoginUrl)
        .send({
          email: "test10@gmail.com",
          password: "hello12345",
        })
        .expect("Content-Type", /json/)
        .expect(404);
    });

    test("Login wrong password", async () => {
      const result = await supertest(app)
        .post(LoginUrl)
        .send({
          email: "test1@gmail.com",
          password: "hello123456",
        })
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });
});
