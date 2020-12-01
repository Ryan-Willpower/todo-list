import { FastifyInstance } from "fastify"
import bcrypt from "bcrypt"

import registerRequestSchema from "./register/schema"

import { generatePassword } from "../../helpers/generate-password"
import knex from "../../helpers/init-db"

interface IRegisterBody {
  username: string
}

async function authenticate(server: FastifyInstance) {
  server.post<{
    Body: IRegisterBody
  }>("/register", registerRequestSchema, async function (req, _res) {
    try {
      const randomPassword = generatePassword()

      const hash = await bcrypt.hash(randomPassword, 10)

      await knex("authors").insert({
        username: req.body.username,
        password: hash,
        // @todo : refresh token will goes here
        refresh_token: "somejwttoken",
      })

      return {
        statusCode: 200,
        message: "Register Success",
        password: randomPassword,
      }
    } catch (error) {
      console.error(error)
      server.log.error(error.message)

      return {
        statusCode: 500,
        message: "Server Error",
      }
    }
  })
}

export default authenticate
