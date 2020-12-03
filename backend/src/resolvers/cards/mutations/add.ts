import {
  IAddCardParams,
  IAppContext,
  ICard,
  ICategory,
} from "../../../@types/graphql"
import knex from "../../../helpers/init-db"

export const addCard = async (
  _: any,
  args: IAddCardParams,
  context: IAppContext
): Promise<ICard> => {
  let category: ICategory | undefined

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

    category = categoryResponse[0] as ICategory
  }

  const card = category
    ? {
        author: context.id,
        content: args.content,
        category: category.id,
      }
    : {
        author: context.id,
        content: args.content,
      }

  const cardReponse = await knex<ICard>("cards").insert(card).returning("*")

  return cardReponse[0]
}
