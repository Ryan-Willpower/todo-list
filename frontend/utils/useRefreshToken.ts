import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { ILoginResponse } from "../@types/login"
import { IAccessTokenContext } from "../@types/app"
import { accessTokenContext } from "./access-token-context"

export function refetchToken() {
  return axios.post<ILoginResponse>(
    "http://localhost:8000/refresh",
    {},
    {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    }
  )
}

export function useRefreshToken() {
  const { accessToken } = useContext(accessTokenContext) as IAccessTokenContext
  const router = useRouter()

  // useEffect(() => {
  //   console.log("call refresh token")
  //   refetchToken()
  //     .then(({ data }) => {
  //       setAccessToken(data.accessToken)
  //       router.push("/")
  //     })
  //     .catch(() => {
  //       router.push("/login")
  //     })
  // }, [])

  useEffect(() => {
    if (accessToken) {
      router.push("/")
    } else {
      router.push("/login")
    }
  }, [])
}
