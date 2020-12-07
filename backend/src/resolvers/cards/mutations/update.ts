import knex from "../../../helpers/init-db"
import {
  IUpdateCardParams,
  IAppContext,
  ICard,
  ICategory,
  CARD_STATUS,
} from "../../../@types/graphql"

export const updateCard = async (
  _: any,
  args: IUpdateCardParams,
  context: IAppContext
): Promise<ICard> => {
  const updateQuery: {
    name?: string
    content?: string
    status?: CARD_STATUS
    category?: string
  } = {}

  if (args.name) {
    updateQuery.name = args.name
  }

  if (args.content) {
    updateQuery.content = args.content
  }

  if (args.status) {
    updateQuery.status = args.status
  }

  if (args.category) {
    const categoryResponse = await knex<ICategory>("categories")
      .insert({
        name: args.category,
      })
      .onConflict("name")
      .merge({
        name: args.category,
      })
      .returning(["id", "name"])

    updateQuery.category = categoryResponse[0].id
  }

  const cardResponse = await knex<ICard>("cards")
    .where({
      id: args.id,
      author: context.id,
    })
    .update(updateQuery)
    .returning("*")

  return cardResponse[0]
}
