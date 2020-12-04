import mockKnex from "mock-knex"
import {
  CARD_STATUS,
  IAppContext,
  ICard,
  ICategory,
} from "../../../../@types/graphql"

import db from "../../../../helpers/init-db"
import { updateCard } from "../../../../resolvers/cards/mutations/update"

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

const date = Date.now()

const dbResponse: { categories: ICategory; cards: ICard } = {
  categories: {
    id: "xxxx",
    name: "test",
  },
  cards: {
    id: "yyyy",
    author: context.id,
    name: "Hello world",
    content: "Hello world",
    status: CARD_STATUS.ACTIVE,
    category: null,
    iat: date.toExponential(),
  },
}

describe("graphql/mutation/updateCard", () => {
  it("should update status", async () => {
    dbTracker.on("query", query => {
      query.response([dbResponse.cards])
    })

    const updateCardResponse = await updateCard(
      null,
      {
        id: "yyyy",
        name: "Hello world",
      },
      context
    )

    expect(updateCardResponse).toStrictEqual(dbResponse.cards)
  })

  it("should update content", async () => {
    dbTracker.on("query", query => {
      query.response([dbResponse.cards])
    })

    const updateCardResponse = await updateCard(
      null,
      {
        id: "yyyy",
        content: "Hello world",
      },
      context
    )

    expect(updateCardResponse).toStrictEqual(dbResponse.cards)
  })

  it("should update status", async () => {
    dbTracker.on("query", query => {
      query.response([dbResponse.cards])
    })

    const updateCardResponse = await updateCard(
      null,
      {
        id: "yyyy",
        status: CARD_STATUS.ACTIVE,
      },
      context
    )

    expect(updateCardResponse).toStrictEqual(dbResponse.cards)
  })

  it("should update category", async () => {
    dbTracker.on("query", (query, step) => {
      ;[
        () => query.response([dbResponse.categories]),
        () => query.response([dbResponse.cards]),
      ][step - 1]()
    })

    const updateCardResponse = await updateCard(
      null,
      {
        id: "yyyy",
        category: "test",
      },
      context
    )

    expect(updateCardResponse).toStrictEqual(dbResponse.cards)
  })
})
