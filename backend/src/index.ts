import "make-promises-safe"
import dotenv from "dotenv"
import fastify, { FastifyInstance } from "fastify"

dotenv.config({
  path: `.env`,
})

import knex from "./helpers/init-db"
import authenticate from "./routes/authenticate"

const server = fastify({
  logger: true,
})

server.decorate("knex", knex)

server.register(authenticate)

server.setErrorHandler(async (error, _req, reply) => {
  if (error.validation) {
    reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
    })
  }
})

async function startServer(server: FastifyInstance) {
  try {
    await server.listen(3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer(server)
