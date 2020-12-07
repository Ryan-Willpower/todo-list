import { useState, createContext } from "react"
import { IAccessTokenContext } from "../@types/app"

export const accessTokenContext = createContext<IAccessTokenContext | {}>({})

export const useAccessTokenContext = () => {
  const { Provider } = accessTokenContext
  const [accessToken, setAccessToken] = useState("")

  return {
    Provider,
    accessToken,
    setAccessToken,
  }
}
