import request from "supertest"
import mockKnex from "mock-knex"

import fastify from "../app"
import db from "../helpers/init-db"

jest.mock("../helpers/generate-password")

beforeAll(async () => {
  await fastify.ready()
})

beforeEach(() => {
  mockKnex.mock(db)
})

afterEach(() => {
  mockKnex.unmock(db)
})

afterAll(async () => {
  await fastify.close()
})

describe("app index", () => {
  it("should query to /register and recieved 200 success with expected response field", async done => {
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
    const dbTracker = mockKnex.getTracker()

    dbTracker.install()

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
      .end(() => {
        dbTracker.uninstall()

        done()
      })
  })

  it("should query to /login and recieved 200 with statusCode, message", async done => {
    const dbTracker = mockKnex.getTracker()

    dbTracker.install()

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
      .end(() => {
        dbTracker.uninstall()

        done()
      })
  })
})
