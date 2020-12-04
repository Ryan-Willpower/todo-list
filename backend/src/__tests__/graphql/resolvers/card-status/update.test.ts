import mockKnex from "mock-knex"
import {
  CARD_STATUS,
  IAppContext,
  QUERY_STATUS,
} from "../../../../@types/graphql"

import db from "../../../../helpers/init-db"
import { updateCardStatus } from "../../../../resolvers/card-status/mutations/update"

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

describe("graphql/mutation/updateCardStatus", () => {
  it("should update a card status", async () => {
    dbTracker.on("query", query => {
      query.response({})
    })

    const updateCardStatusResponse = await updateCardStatus(
      null,
      {
        id: "yyyy",
        status: CARD_STATUS.ACTIVE,
      },
      context
    )

    expect(updateCardStatusResponse).toHaveProperty(
      "status",
      QUERY_STATUS.SUCCESS
    )
  })

  it("should delete fail and return with FAIL enum status", async () => {
    dbTracker.on("query", query => {
      query.reject("Something is not right")
    })

    const updateCardStatusResponse = await updateCardStatus(
      null,
      {
        id: "yyyy",
        status: CARD_STATUS.ACTIVE,
      },
      context
    )

    expect(updateCardStatusResponse).toHaveProperty("status", QUERY_STATUS.FAIL)
  })
})
