declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOSTNAME: string
      DB_USERNAME: string
      DB_PASSWORD: string
      DB_NAME: string
      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
      FRONTEND_HOSTNAME: string
    }
  }
}

export {}
