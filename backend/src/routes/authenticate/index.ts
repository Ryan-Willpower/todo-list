import { FastifyInstance } from "fastify"

import { register } from "./register/handler"
import registerRequestSchema from "./register/schema"

import { IRegisterBody } from "../../@types/routes/authenticate"

async function authenticate(server: FastifyInstance) {
  server.post<{
    Body: IRegisterBody
  }>("/register", registerRequestSchema, register)
}

export default authenticate
