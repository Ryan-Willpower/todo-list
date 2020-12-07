import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { ILoginResponse } from "../@types/login"
import { IAccessTokenContext } from "../@types/app"
import { accessTokenContext } from "./access-token-context"

export function refetchToken() {
  return axios.post<ILoginResponse>(
    `${process.env.BACKEND_HOSTNAME}/refresh`,
    {},
    {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    }
  )
}

interface UseRefreshTokenProps {
  redirectTo?: string
}

export function useRefreshToken(unauth?: UseRefreshTokenProps) {
  const { accessToken } = useContext(accessTokenContext) as IAccessTokenContext
  const router = useRouter()
  const redirectTo = unauth?.redirectTo || "/login"

  useEffect(() => {
    if (accessToken) {
      router.push("/")
    } else {
      router.push(redirectTo)
    }
  }, [])
}
