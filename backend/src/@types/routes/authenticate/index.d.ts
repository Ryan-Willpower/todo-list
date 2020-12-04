export interface IRegisterBody {
  username: string
}

export interface ILoginBody {
  username: string
  password: string
}

export interface IRefreshTokenBody {
  accessToken: string
}

export interface IRefreshTokenPayload {
  username: string
  key: string
  type: string
  iat: number
  exp: number
}
