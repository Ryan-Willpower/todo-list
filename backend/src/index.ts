import fastify from 'fastify'

const server = fastify({
  logger: true
})

server.get('/', (_req, res) => {
  res.send({status: "ok!"})
})

server.listen(3000)