import bcrypt from "bcrypt"
import { FastifyReply, FastifyRequest } from "fastify"

import knex from "../../../helpers/init-db"
import { generatePassword } from "../../../helpers/generate-password"
import KnexError from "../../../helpers/knex-error"
import { IRegisterBody } from "../../../@types/routes/authenticate"
import { IAuthorTable } from "../../../@types/db"
import { IKnexError } from "../../../@types/helpers/knex-error"

export async function register(
  req: FastifyRequest<{ Body: IRegisterBody }>,
  _res: FastifyReply
) {
  const randomPassword = generatePassword()

  const saltRound = 10

  const hash = await bcrypt.hash(randomPassword, saltRound)

  await knex<IAuthorTable>("authors")
    .insert({
      username: req.body.username.trim(),
      password: hash,
    })
    .on("query-error", (error: IKnexError) => {
      throw new KnexError({
        table: error.table,
        detail: error.detail,
        constraint: error.constraint,
      })
    })

  return {
    statusCode: 200,
    message: "Register Success",
    password: randomPassword,
  }
}
