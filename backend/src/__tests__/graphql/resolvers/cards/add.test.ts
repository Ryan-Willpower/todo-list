import mockKnex from "mock-knex"
import {
  CARD_STATUS,
  IAppContext,
  ICard,
  ICategory,
} from "../../../../@types/graphql"

import db from "../../../../helpers/init-db"
import { addCard } from "../../../../resolvers/cards/mutations/add"

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

describe("graphql/mutation/addCard", () => {
  it("should insert a new card without category", async () => {
    dbTracker.on("query", query => {
      query.response([dbResponse.cards])
    })

    const addCardResponse = await addCard(
      null,
      {
        name: "Hello world",
      },
      context
    )

    expect(addCardResponse).toStrictEqual(dbResponse.cards)
  })

  it(`should insert a new card with a new category`, async () => {
    const cardWithCategory = { ...dbResponse.cards }
    cardWithCategory.category = "xxxx"

    dbTracker.on("query", (query, step) => {
      ;[
        () => query.response([dbResponse.categories]),
        () => query.response([cardWithCategory]),
      ][step - 1]()
    })

    const addCardResponse = await addCard(
      null,
      {
        name: "Hello world",
        content: "Hello world",
        category: "test",
      },
      context
    )

    expect(addCardResponse).toStrictEqual(cardWithCategory)
  })
})
