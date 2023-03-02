import { describe, test, beforeAll, afterAll } from "@jest/globals";
import supertest from "supertest";

import app from "../app";

describe("Test user api", () => {
  const BASE_URL = "/user";
  let commonHeaders = {
    Authorization: "",
  };
  let logoutBody = {
    token: "",
  };

  describe("Test login api", () => {
    const requestUrl = `${BASE_URL}/login`;

    test("Login success", async () => {
      const result = await supertest(app)
        .post(requestUrl)
        .send({
          email: "test1@gmail.com",
          password: "hello12345",
        })
        .expect("Content-Type", /json/)
        .expect(200);
      commonHeaders.Authorization = result.body.accessToken;
      logoutBody.token = result.body.refreshToken;
    });

    test("Login invalid user", async () => {
      const result = await supertest(app)
        .post(requestUrl)
        .send({
          email: "test10@gmail.com",
          password: "hello12345",
        })
        .expect("Content-Type", /json/)
        .expect(404);
    });

    test("Login wrong password", async () => {
      const result = await supertest(app)
        .post(requestUrl)
        .send({
          email: "test1@gmail.com",
          password: "hello123456",
        })
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });

  describe("Test refresh token api", () => {
    const requestUrl = `${BASE_URL}/refresh-token`;

    test("Should be successful", async () => {
      const result = await supertest(app)
        .patch(requestUrl)
        .send(logoutBody)
        .expect("Content-Type", /json/)
        .expect(200);

      commonHeaders.Authorization = result.body.accessToken;
      logoutBody.token = result.body.refreshToken;
    });

    test("Should give 400 error", async () => {
      const result = await supertest(app)
        .patch(requestUrl)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });

  describe("Test logout api", () => {
    const requestUrl = `${BASE_URL}/logout`;

    test("Should be successful", async () => {
      const result = await supertest(app)
        .delete(requestUrl)
        .send(logoutBody)
        .expect(204);
    });

    test("Should give 400 error", async () => {
      const result = await supertest(app)
        .delete(requestUrl)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });
});
