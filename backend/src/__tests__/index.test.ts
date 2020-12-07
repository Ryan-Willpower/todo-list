import request from "supertest"
import mockKnex from "mock-knex"
import * as jwt from "jsonwebtoken"

import fastify from "../app"
import db from "../helpers/init-db"

jest.mock("../helpers/generate-password")

const dbTracker = mockKnex.getTracker()

beforeAll(async () => {
  await fastify.ready()
})

beforeEach(() => {
  mockKnex.mock(db)
  dbTracker.install()
})

afterEach(() => {
  dbTracker.uninstall()
  mockKnex.unmock(db)
})

afterAll(async () => {
  await fastify.close()
})

describe("app index", () => {
  it("should query to /register and recieved 200 success with expected response field", async done => {
    dbTracker.on("query", function (query) {
      query.response({})
    })

    request(fastify.server)
      .post("/register")
      .send({ username: "john" })
      .set("Accept", "application/json")
      .expect(200)
      .expect({
        statusCode: 200,
        message: "Register Success",
        password: "xxxxxx",
      })
      .end(done)
  })

  it("should query to /register and recieved 406 when send an exist name to a server", async done => {
    dbTracker.on("query", query => {
      query.reject("Key (username)=(john) is already exist")
    })

    request(fastify.server)
      .post("/register")
      .send({ username: "john" })
      .set("Accept", "application/json")
      .expect(406)
      .expect({
        statusCode: 406,
        error: "Database Query Not Accept",
      })
      .end(done)
  })

  it("should query to /login and recieved 200 with statusCode, message", async done => {
    dbTracker.on("query", function (query) {
      query.response([
        {
          id: "someid",
          username: "john",
          password: "xxxxxx",
          iat: new Date(),
        },
      ])
    })

    request(fastify.server)
      .post("/login")
      .send({ username: "john", password: "xxxxxx" })
      .set("Accept", "application/json")
      .expect(200)
      .expect({
        statusCode: 200,
        message: "Login Successfully",
        accessToken: "aaaa.bbbb.cccc",
      })
      .end(done)
  })

  it("should query to /refresh and recieved 200 with statusCode", async done => {
    jest.spyOn(jwt, "decode").mockReturnValue({
      author: "john",
      type: "access",
      iat: new Date(),
      exp: new Date(),
    })

    jest.spyOn(jwt, "verify").mockImplementation(() => ({
      username: "john",
      type: "refresh",
      key: "somekey",
      iat: new Date(),
      exp: new Date(),
    }))

    const twoWeeksInMS = 1000 * 60 * 60 * 24 * 14
    const date = new Date(new Date().getTime() + twoWeeksInMS).toISOString()

    dbTracker.on("query", function (query, step) {
      ;[
        () => query.response([{ refresh_token: "mmmm.nnnn.oooo" }]),
        () => query.response({}),
      ][step - 1]()
    })

    request(fastify.server)
      .post("/refresh")
      .send({ accessToken: "aaaa.bbbb.cccc" })
      .set("Accept", "application/json")
      .set("Cookie", [
        "refresh_token=mmmm.nnnn.oooo",
        `refresh_token_expiry=${date}`,
      ])
      .expect(200)
      .expect({
        statusCode: 200,
        message: "Success",
        accessToken: "aaaa.bbbb.cccc",
      })
      .end(done)
  })
})
