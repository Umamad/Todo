import { describe, test, beforeAll, afterAll, jest } from "@jest/globals";
import supertest from "supertest";

import app from "../app";

jest.setTimeout(20000);

describe("Test todo Apis", function () {
  let commonHeaders = {
    Authorization: "",
  };
  let logoutBody = {
    token: "",
  };

  beforeAll((done) => {
    const result = supertest(app)
      .post("/user/login")
      .send({
        email: "test1@gmail.com",
        password: "hello12345",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        commonHeaders.Authorization = `Bearer ${response.body.accessToken}`;
        logoutBody.token = response.body.refreshToken;
        done();
      });
  });

  afterAll((done) => {
    const result = supertest(app)
      .delete("/user/logout")
      .send(logoutBody)
      .expect(204)
      .then((_) => {
        done();
      });
  });

  test("Get all todo", async () => {
    const result = await supertest(app)
      .get("/todo")
      .set(commonHeaders)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("Post new todo", async () => {
    const result = await supertest(app)
      .post("/todo")
      .send({
        title: "jest test todo",
        description: "jest test description",
        priority: "high",
      })
      .set(commonHeaders)
      .expect("Content-Type", /json/)
      .expect(201);
  });
});
