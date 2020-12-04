import knex from "../../../helpers/init-db"
import {
  IUpdateCardParams,
  IAppContext,
  ICard,
  ICategory,
} from "../../../@types/graphql"

export const updateCard = async (
  _: any,
  args: IUpdateCardParams,
  context: IAppContext
): Promise<ICard> => {
  const updateQuery: IUpdateCardParams = {
    id: args.id,
  }

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
    .update(updateQuery)
    .where({
      id: args.id,
      author: context.id,
    })
    .returning("*")

  return cardResponse[0]
}
