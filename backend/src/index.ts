import { FastifyInstance } from "fastify"

import server from "./app"

export async function startServer(server: FastifyInstance) {
  try {
    await server.listen(3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer(server)
