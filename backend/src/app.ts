import "make-promises-safe"

import dotenv from "dotenv"

dotenv.config({
  path: `.env`,
})

import fastify from "fastify"
import fastifyCookies from "fastify-cookie"
import { ApolloServer } from "apollo-server-fastify"
import fastifyCORS from "fastify-cors"

import knex from "./helpers/init-db"
import authenticate from "./routes/authenticate"
import KnexError from "./helpers/knex-error"
import typeDefs from "./typedefs"
import cards from "./resolvers/cards"
import cardStatus from "./resolvers/card-status"
import { context } from "./helpers/graphql-context"

const server = fastify({
  logger: true,
})

server.register(fastifyCORS, {
  origin: process.env.FRONTEND_HOSTNAME,
  credentials: true,
})

server.decorate("knex", knex)

server.register(fastifyCookies)

server.register(authenticate)

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: [cards, cardStatus],
  context,
  playground: true,
  introspection: true,
})

server.register(
  apolloServer.createHandler({
    cors: {
      origin: process.env.FRONTEND_HOSTNAME,
      credentials: true,
    },
  })
)

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

  console.error(error)

  reply.status(500)

  return {
    statusCode: 500,
    error: "Server Error",
  }
})

export default server
