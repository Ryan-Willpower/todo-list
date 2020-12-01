declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOSTNAME: string
      DB_USERNAME: string
      DB_PASSWORD: string
      DB_NAME: string
    }
  }
}

export {}