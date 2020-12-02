import "make-promises-safe"
import dotenv from "dotenv"
import fastify from "fastify"

dotenv.config({
  path: `.env`,
})

import knex from "./helpers/init-db"
import authenticate from "./routes/authenticate"
import KnexError from "./helpers/knex-error"

const server = fastify({
  logger: true,
})

server.decorate("knex", knex)

server.register(authenticate)

server.setErrorHandler(async (error, _req, reply) => {
  if (error.validation) {
    reply.status(400)

    return {
      statusCode: 400,
      error: "Bad Request",
    }
  }

  if (error instanceof KnexError) {
    const { detail, table } = error

    server.log.error({ detail, table })

    reply.status(406)

    return {
      statusCode: 406,
      error: "Database Query Not Accept",
      detail,
    }
  }

  reply.status(500)

  return {
    statusCode: 500,
    error: "Server Error",
  }
})

export default server
