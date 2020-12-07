export interface IAddCardParams {
  name: string
  content?: string
  category?: string
}

export interface IUpdateCardParams {
  id: string
  name?: string
  content?: string
  category?: string
  status?: CARD_STATUS
}

export interface IDeleteCardParams {
  id: string
}

export interface IUpdateCardStatusParams {
  id: string
  status: CARD_STATUS
}

export interface IAppContext {
  id: string
  author: string
}

export enum CARD_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ICard {
  id: string
  author: string
  name: string
  status: CARD_STATUS
  content: string
  category?: string | null
  iat: Date | string
}

export interface ICategory {
  id: string
  name: string
}

export enum QUERY_STATUS {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export interface QueryStatus {
  status: QUERY_STATUS
  message?: string
}
