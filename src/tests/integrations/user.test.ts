import express from "express";
import request from "supertest";
import config from "../../config/constant";
import { db } from "../../config/database";
import Server from "../../config/server";
import middleware from "../../middlewares/middleware";
import routes from "../../config/routes";
import errorHandler from "../../middlewares/errorHandler";
import UserEntity from "../../modules/User/entity";

const app = express();

const server = new Server(app);

server.middlewares(middleware);
server.routes(routes);
server.errorHandler(errorHandler);

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  let manager = db.getRepository<UserEntity>(UserEntity)
  await manager.clear();
  await db.close();
});

// tester toutes les routes :
describe("post/users:", () => {
  it("should return a  201 http status", async () => {
    const res = await request(server.app)
      .post(config.API_VERSION + "/users/auth/register")
      .send({ email: "d@test16.fr", password: "d1" })
      .expect(201);

    expect(res.body.email).toBe("d@test16.fr");
  });
});

describe("post /users :", () => {
  it("should return a  400 http status if your data is empty or invalid", async () => {
    try {
      await request(server.app)
        .post(config.API_VERSION + "/users/auth/register")
        .send({ email: "", password: "" });
    } catch (error: any) {
      expect(error.status).toBe(403);
    }
  });
});
