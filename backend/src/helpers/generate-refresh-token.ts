import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

import { generatePassword } from "./generate-password"

export async function generateRefreshToken(username: string) {
  // key will be using for verify the refresh_token integrity
  const salt = await bcrypt.genSalt()
  const randomString = generatePassword()
  const keyHash = await bcrypt.hash(`${username}${randomString}`, salt)

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as jwt.Secret

  const refreshTokenPayload = {
    username,
    key: keyHash,
    type: "refresh",
  }

  const refreshTokenOptions = {
    expiresIn: "2 weeks",
  }

  const refreshToken = jwt.sign(
    refreshTokenPayload,
    refreshTokenSecret,
    refreshTokenOptions
  )

  return refreshToken
}
