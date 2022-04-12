import express from "express";
import supertest from "supertest";
import config from "../../config/constant";
import { db } from "../../config/database";
import Server from "../../config/server";
import middleware from "../../middlewares/middleware";
import routes from "../../config/routes";
import errorHandler from "../../middlewares/errorHandler";

const app = express();

const server = new Server(app);

beforeAll(async () => {
  await db.connect();
});

server.connecte(db);
server.middlewares(middleware);
server.routes(routes);
server.errorHandler(errorHandler);
// server.start(config.PORT);

// attention les tests doivent etre executés en développent sur une bdd test dédiée aux tests et ne jamais faire de test en prod

// const app = express();
// const server = new Server(app);
// const api = new App(routes, middlewares);



// tester toutes les routes :
describe("post/users:", () => {
  it("should return a  201 http status", async () => {
    const res = await supertest(server.app)
      .post(config.API_VERSION + "/users/auth/register")
      .send({ email: "d@test4.fr", password: "d1" })
      .expect(201);
      

    expect(res.body.email).toBe("d@test4.fr");
  });
});

describe("post /users :", () => {
  it("should return a  400 http status if your data is empty or invalid", async () => {
    try {
      await supertest(server.app)
        .post(config.API_VERSION + "/users/auth/register")
        .send({ email: "", password: "" });
    } catch (error:any) {
      expect(error.status).toBe(403);
    }
  });
});

afterAll(async () => {
  await db.close();
});