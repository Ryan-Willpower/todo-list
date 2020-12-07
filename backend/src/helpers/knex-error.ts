import { IKnexError } from "../@types/helpers/knex-error"

class KnexError extends Error {
  detail: string
  table: string
  constraint: string

  constructor({ table, detail, constraint }: IKnexError) {
    super("Error database query")

    this.name = "KnexError"

    this.detail = detail
    this.table = table
    this.constraint = constraint

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KnexError)
    }
  }
}

export default KnexError
