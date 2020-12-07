import * as jwt from "jsonwebtoken"

export function generateAccessToken(username: string): string {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as jwt.Secret

  const accessTokenPayload = {
    author: username,
    type: "access",
  }

  const accessTokenOptions = {
    expiresIn: "30 minutes",
  }

  const accessToken = jwt.sign(
    accessTokenPayload,
    accessTokenSecret,
    accessTokenOptions
  )

  return accessToken
}
