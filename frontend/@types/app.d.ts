import { Dispatch, SetStateAction } from "react"

export interface IAccessTokenContext {
  accessToken: string
  setAccessToken: Dispatch<SetStateAction<string>>
}

export interface IAccessTokenPayload {
  author: string
  type: string
}

export interface ICard {
  id: string
  name: string
  content?: string | null
  status: CARD_STATUS
}
