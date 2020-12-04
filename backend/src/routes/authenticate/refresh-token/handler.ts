import { FastifyReply, FastifyRequest } from "fastify"
import * as jwt from "jsonwebtoken"
import { IAuthorTable } from "../../../@types/db"
import { IRequestPayload } from "../../../@types/helpers/graphql-context"

import {
  IRefreshTokenBody,
  IRefreshTokenPayload,
} from "../../../@types/routes/authenticate"
import { response } from "../../../helpers/const"
import { generateAccessToken } from "../../../helpers/generate-access-token"
import { generateRefreshToken } from "../../../helpers/generate-refresh-token"
import knex from "../../../helpers/init-db"

export async function refreshToken(
  req: FastifyRequest<{
    Body: IRefreshTokenBody
  }>,
  res: FastifyReply
) {
  if (!req?.cookies?.refresh_token && !req?.cookies?.refresh_token_expiry) {
    res.status(401)

    return response.httpError.notAuthorize()
  }

  const accessTokenPayload = jwt.decode(req.body.accessToken) as IRequestPayload

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as jwt.Secret

  try {
    checkTokenExpire(req.cookies.refresh_token_expiry)

    const refreshTokenPayload = jwt.verify(
      req.cookies.refresh_token,
      refreshTokenSecret
    ) as IRefreshTokenPayload

    checkTokenType(refreshTokenPayload.type)

    checkTokenOwner(accessTokenPayload.author, refreshTokenPayload.username)

    const refreshTokenFromDatabase = await knex<IAuthorTable>("authors")
      .select(["refresh_token"])
      .where({
        username: refreshTokenPayload.username,
      })

    checkTokenExist(refreshTokenFromDatabase[0]?.refresh_token)

    const databaseRefreshTokenPayload = jwt.verify(
      refreshTokenFromDatabase[0].refresh_token as string,
      refreshTokenSecret
    ) as IRefreshTokenPayload

    validateKey(refreshTokenPayload.key, databaseRefreshTokenPayload.key)

    const newAccessToken = generateAccessToken(
      databaseRefreshTokenPayload.username
    )

    const newRefreshToken = await generateRefreshToken(
      databaseRefreshTokenPayload.username
    )

    await knex<IAuthorTable>("authors")
      .where("username", "=", databaseRefreshTokenPayload.username)
      .update({
        refresh_token: newRefreshToken,
      })
      .on("query-error", () => {
        res.status(503)

        return response.httpError.serviceUnavailable()
      })

    const twoWeeksInMS = 1000 * 60 * 60 * 24 * 14

    res.setCookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      path: "/refresh",
    })
    res.setCookie(
      "refresh_token_expiry",
      new Date(new Date().getTime() + twoWeeksInMS).toISOString(),
      { httpOnly: true, path: "/refresh" }
    )

    return response.httpSuccess.success(
      response.httpSuccess.DEFAULT_MESSAGE.SUCCESS,
      { accessToken: newAccessToken }
    )
  } catch (error) {
    console.error(error)

    res.status(401)

    return response.httpError.notAuthorize(
      response.httpError.DEFAULT_MESSAGE.NOT_AUTHORIZE,
      { message: error.message }
    )
  }
}

function checkTokenExpire(expireDate: string) {
  if (new Date(expireDate).valueOf() < Date.now()) {
    throw new Error("Expired refresh token")
  }
}

function checkTokenType(type: string) {
  if (type !== "refresh") {
    throw new Error("Invalid refresh token type")
  }
}

function checkTokenOwner(tokenOwnerA: string, tokenOwnerB: string) {
  if (tokenOwnerA !== tokenOwnerB) {
    throw new Error("Invalid refresh token owner")
  }
}

function checkTokenExist(data?: string) {
  if (!data) {
    throw new Error("Invalid refresh token")
  }
}

function validateKey(keyA: string, keyB: string) {
  if (keyA !== keyB) {
    throw new Error("Invalid refresh token key")
  }
}
