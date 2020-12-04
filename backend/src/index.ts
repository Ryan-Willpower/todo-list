import { FastifyInstance } from "fastify"

import server from "./app"

export async function startServer(server: FastifyInstance) {
  try {
    const port = process.env.PORT || 3000
    const hostname = process.env.HOSTNAME || "localhost"

    await server.listen(port, hostname)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer(server)
