import mockKnex from "mock-knex"
import { IAppContext, QUERY_STATUS } from "../../../../@types/graphql"

import db from "../../../../helpers/init-db"
import { deleteCard } from "../../../../resolvers/cards/mutations/delete"

const dbTracker = mockKnex.getTracker()

beforeEach(() => {
  mockKnex.mock(db)
  dbTracker.install()
})

afterEach(() => {
  dbTracker.uninstall()
  mockKnex.unmock(db)
})

const context: IAppContext = {
  id: "someid",
  author: "john",
}

describe("graphql/mutation/deleteCard", () => {
  it("should delete a card", async () => {
    dbTracker.on("query", query => {
      query.response({})
    })

    const deleteCardResponse = await deleteCard(
      null,
      {
        id: "yyyy",
      },
      context
    )

    expect(deleteCardResponse).toHaveProperty("status", QUERY_STATUS.SUCCESS)
  })

  it("should delete fail and return with FAIL enum status", async () => {
    dbTracker.on("query", query => {
      query.reject("Something is not right")
    })

    const deleteCardResponse = await deleteCard(
      null,
      {
        id: "yyyy",
      },
      context
    )

    expect(deleteCardResponse).toHaveProperty("status", QUERY_STATUS.FAIL)
  })
})
