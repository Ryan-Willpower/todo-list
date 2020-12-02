import { FastifyInstance } from "fastify"

import { register } from "./register/handler"
import registerRequestSchema from "./register/schema"
import { login } from "./login/handler"
import loginRequestSchema from "./login/schema"

import { ILoginBody, IRegisterBody } from "../../@types/routes/authenticate"

async function authenticate(server: FastifyInstance) {
  server.post<{
    Body: IRegisterBody
  }>("/register", registerRequestSchema, register)

  server.post<{
    Body: ILoginBody
  }>("/login", loginRequestSchema, login)
}

export default authenticate
