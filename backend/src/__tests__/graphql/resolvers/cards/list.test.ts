import mockKnex from "mock-knex"
import { IAppContext } from "../../../../@types/graphql"

import db from "../../../../helpers/init-db"
import { listCards } from "../../../../resolvers/cards/queries/list"

const dbTracker = mockKnex.getTracker()

beforeEach(() => {
  mockKnex.mock(db)
  dbTracker.install()
})

afterEach(() => {
  dbTracker.uninstall()
  mockKnex.unmock(db)
})

const dbResponse = [
  [
    {
      id: "5d0374e5-140e-45ec-bb7a-3f99024f3fb1",
      author: "abf0c7f7-0b9a-49b0-9683-37a64de4ddbd",
      content: "hello world",
      status: "ACTIVE",
      category: null,
      iat: "1606985541570",
    },
    {
      id: "132e0f06-12ae-484a-b62e-941fbd2b1a8d",
      author: "abf0c7f7-0b9a-49b0-9683-37a64de4ddbd",
      content: "hello world",
      status: "ACTIVE",
      category: null,
      iat: "1606985574462",
    },
  ],
]

const context: IAppContext = {
  id: "someid",
  author: "john",
}

describe("resolvers/query/listCards", () => {
  it("should get all cards", async () => {
    dbTracker.on("query", function (query) {
      query.response(dbResponse)
    })

    const listCardResponse = await listCards(null, null, context)

    expect(listCardResponse).toStrictEqual(dbResponse)
  })
})
