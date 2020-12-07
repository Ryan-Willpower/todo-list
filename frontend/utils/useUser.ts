import { useState, useContext, useEffect } from "react"
import decode from "jwt-decode"
import { IAccessTokenContext, IAccessTokenPayload } from "../@types/app"
import { accessTokenContext } from "./access-token-context"

export function useUser() {
  const [user, setUser] = useState<string | null | undefined>("")

  const { accessToken } = useContext(accessTokenContext) as IAccessTokenContext

  useEffect(() => {
    if (accessToken) {
      const tokenPayload = decode<IAccessTokenPayload>(accessToken)

      setUser(tokenPayload?.author)
    }
  })

  return user
}
