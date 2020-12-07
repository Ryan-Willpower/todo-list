import { AuthenticationError } from "apollo-server-fastify"
import { FastifyRequest } from "fastify"
import mockKnex from "mock-knex"
import * as jwt from "jsonwebtoken"

import { IAuthorTable } from "../../@types/db"
import { context } from "../../helpers/graphql-context"

import db from "../../helpers/init-db"

jest.mock("jsonwebtoken")

const dbTracker = mockKnex.getTracker()

beforeEach(() => {
  mockKnex.mock(db)
  dbTracker.install()
})

afterEach(() => {
  dbTracker.uninstall()
  mockKnex.unmock(db)
  jest.restoreAllMocks()
})

const date = Date.now()

const dbResponse: IAuthorTable = {
  id: "aaaa",
  username: "john",
  password: "encryptPassword",
  iat: date.toExponential(),
}

process.env.ACCESS_TOKEN_SECRET = "somesecretkey"

describe("helper/graphql-context", () => {
  it("should successfully extract the token which recieved from client", async () => {
    dbTracker.on("query", query => {
      query.response([dbResponse])
    })

    const request = {
      headers: {
        authorization: "Bearer xxxx.yyyy.zzzz",
      },
    } as FastifyRequest

    const appContext = await context({ request })

    expect(appContext).toStrictEqual({
      id: dbResponse.id,
      author: dbResponse.username,
    })
  })

  it("should throw Authorization error when no headers was send", async () => {
    const request = {} as FastifyRequest

    await expect(context({ request })).rejects.toThrowError(
      new AuthenticationError("Access token not found")
    )
  })

  it("should throw Authorization error when headers is invalid form", async () => {
    const request = {
      headers: {
        authorization: "xxxx.yyyy.zzzz",
      },
    } as FastifyRequest

    await expect(context({ request })).rejects.toThrowError(
      new AuthenticationError("Invalid access token")
    )
  })

  it("should throw Authorization error when jwt.verify throw any error", async () => {
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new jwt.JsonWebTokenError("Invalid token signature")
    })

    const request = {
      headers: {
        authorization: "Bearer wrong.jwt.token",
      },
    } as FastifyRequest

    await expect(context({ request })).rejects.toThrowError(
      new AuthenticationError("Invalid access token")
    )
  })
})
