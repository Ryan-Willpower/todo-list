import { AuthenticationError } from "apollo-server-fastify"
import { FastifyRequest } from "fastify/types/request"
import * as jwt from "jsonwebtoken"

import knex from "./init-db"
import { IAuthorTable } from "../@types/db"
import { IRequestPayload } from "../@types/helpers/graphql-context"

export const context = async ({ request }: { request: FastifyRequest }) => {
  if (!request?.headers?.authorization) {
    throw new AuthenticationError("Access token not found")
  }

  const rawToken = request.headers.authorization

  if (!rawToken.includes("Bearer")) {
    throw new AuthenticationError("Invalid access token")
  }

  const token = request.headers.authorization.replace(/^Bearer\s/gi, "")
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as jwt.Secret

  let payload: IRequestPayload

  try {
    payload = jwt.verify(token, accessTokenSecret) as IRequestPayload
  } catch (error) {
    throw new AuthenticationError("Invalid access token")
  }

  const userData = await knex<IAuthorTable>("authors")
    .select(["id", "username"])
    .where("username", "=", payload.author)

  return {
    id: userData[0].id,
    author: userData[0].username,
  }
}
