import { FastifyReply, FastifyRequest } from "fastify"
import bcrypt from "bcrypt"

import { IAuthorTable } from "../../../@types/db"
import { ILoginBody } from "../../../@types/routes/authenticate"
import { response } from "../../../helpers/const"
import knex from "../../../helpers/init-db"
import { generateAccessToken } from "../../../helpers/generate-access-token"
import { generateRefreshToken } from "../../../helpers/generate-refresh-token"

export async function login(
  req: FastifyRequest<{
    Body: ILoginBody
  }>,
  res: FastifyReply
) {
  const users = await knex
    .select("username", "password")
    .from<IAuthorTable>("authors")
    .where({
      username: req.body.username,
    })
    .on("query-error", () => {
      res.status(503)

      return response.httpError.serviceUnavailable()
    })

  if (users.length === 0) {
    res.status(404)

    return response.httpError.notFound()
  }

  const validUser = users.find(async user => {
    return await bcrypt.compare(req.body.password, user.password)
  })

  if (!validUser) {
    res.status(404)

    return response.httpError.notFound()
  }

  const accessToken = generateAccessToken(validUser.username)

  const refreshToken = await generateRefreshToken(validUser.username)

  knex<IAuthorTable>("authors")
    .where("username", "=", validUser.username)
    .update({
      refresh_token: refreshToken,
    })
    .on("query-error", () => {
      res.status(503)

      return response.httpError.serviceUnavailable()
    })

  const twoWeeksInMS = 1000 * 60 * 60 * 24 * 14

  res.setCookie("refresh_token", refreshToken, {
    httpOnly: true,
    path: "/refresh-token",
  })
  res.setCookie(
    "refresh_token_expiry",
    new Date(new Date().getTime() + twoWeeksInMS).toISOString(),
    { httpOnly: true, path: "/refresh-token" }
  )

  return response.httpSuccess.success("Login Successfully", { accessToken })
}
