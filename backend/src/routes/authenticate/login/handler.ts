import { FastifyReply, FastifyRequest } from "fastify"
import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

import { IAuthorTable } from "../../../@types/db"
import { ILoginBody } from "../../../@types/routes/authenticate"
import { response } from "../../../helpers/const"
import knex from "../../../helpers/init-db"
import { generatePassword } from "../../../helpers/generate-password"

export async function login(
  req: FastifyRequest<{
    Body: ILoginBody
  }>,
  res: FastifyReply
) {
  const data = await knex
    .select("username", "password")
    .from<IAuthorTable>("authors")
    .where({
      username: req.body.username,
    })
    .on("query-error", () => {
      res.status(503)

      return response.httpError.serviceUnavailable()
    })

  if (data.length === 0) {
    return response.httpError.notFound()
  }

  const validUser = data.find(async user => {
    return await bcrypt.compare(req.body.password, user.password)
  })

  if (!validUser) {
    return response.httpError.notFound()
  }

  const accessTokenPayload = {
    author: validUser.username,
    type: "access",
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as jwt.Secret
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as jwt.Secret

  const accessToken = jwt.sign(accessTokenPayload, accessTokenSecret, {
    expiresIn: "15 minutes",
  })

  const salt = await bcrypt.genSalt()
  const randomString = generatePassword()
  const keyHash = await bcrypt.hash(
    `${validUser.username}${randomString}`,
    salt
  )

  const refreshTokenPayload = {
    username: validUser.username,
    key: keyHash,
    type: "refresh",
  }

  const refreshToken = jwt.sign(refreshTokenPayload, refreshTokenSecret, {
    expiresIn: "2 weeks",
  })

  console.log(refreshToken)

  const refreshTokenHash = await bcrypt.hash(refreshToken, salt)

  knex<IAuthorTable>("authors")
    .where("username", "=", validUser.username)
    .update({
      refresh_token: refreshTokenHash,
    })
    .on("query-error", () => {
      res.status(503)

      return response.httpError.serviceUnavailable()
    })

  const twoWeeksInMS = 1000 * 60 * 60 * 24 * 14

  res.setCookie("refresh_token", refreshToken)
  res.setCookie(
    "refresh_token_expiry",
    new Date(new Date().getTime() + twoWeeksInMS).toISOString()
  )

  return response.httpSuccess.success("Login Successfully", { accessToken })
}
