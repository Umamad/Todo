import {
  describe,
  test,
  beforeAll,
  afterAll,
  expect,
} from "@jest/globals";
import supertest from "supertest";

import app from "../app";

describe("Test todo Apis", function () {
  let editableTodoId = 0;
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

  describe("Get all todo", () => {
    test("Should be success", async () => {
      const result = await supertest(app)
        .get("/todo")
        .set(commonHeaders)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(typeof result.body).toEqual("object");
      editableTodoId = result.body[0].id;
    });

    test("Should be forbidden", async () => {
      const result = await supertest(app).get("/todo").expect(403);
    });
  });

  describe("Post new todo", () => {
    test("Should be success", async () => {
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

    test("Should fail with 400", async () => {
      const result = await supertest(app)
        .post("/todo")
        .send({
          // title: "jest test todo",
          description: "jest test description",
          // priority: "high",
        })
        .set(commonHeaders)
        .expect("Content-Type", /json/)
        .expect(400);
    });

    test("Should be forbidden", async () => {
      const result = await supertest(app)
        .post("/todo")
        .send({
          title: "jest test todo",
          description: "jest test description",
          priority: "high",
        })
        .expect(403);
    });
  });

  describe("Edit todo", () => {
    test("Should be success", async () => {
      const result = await supertest(app)
        .patch(`/todo/${editableTodoId}`)
        .send({
          title: "jest test edit todo",
          description: "jest test edit description",
          priority: "low",
        })
        .set(commonHeaders)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("Should fail not found", async () => {
      const result = await supertest(app)
        .patch(`/todo`)
        .send({
          title: "jest test edit todo",
          description: "jest test edit description",
          priority: "low",
        })
        .set(commonHeaders)
        .expect(404);
    });

    test("Should fail with 400", async () => {
      const result = await supertest(app)
        .patch(`/todo/asda`)
        .send({
          title: "jest test edit todo",
          description: "jest test edit description",
          priority: "low",
        })
        .set(commonHeaders)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(result.body.message).toEqual("Invalid id");
    });

    test("Should be forbidden", async () => {
      const result = await supertest(app)
        .patch(`/todo/${editableTodoId}`)
        .send({
          title: "jest test todo",
          description: "jest test description",
          priority: "high",
        })
        .expect(403);
    });
  });

  describe("Delete todo", () => {
    test("Should be success", async () => {
      const result = await supertest(app)
        .delete(`/todo/${editableTodoId}`)
        .set(commonHeaders)
        .expect(204);
    });

    test("Should fail not found", async () => {
      const result = await supertest(app)
        .delete(`/todo`)
        .set(commonHeaders)
        .expect(404);
    });

    test("Should fail with 400", async () => {
      const result = await supertest(app)
        .delete(`/todo/asda`)
        .set(commonHeaders)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(result.body.message).toEqual("Invalid id");
    });

    test("Should be forbidden", async () => {
      const result = await supertest(app)
        .delete(`/todo/${editableTodoId}`)
        .expect(403);
    });
  });
});
