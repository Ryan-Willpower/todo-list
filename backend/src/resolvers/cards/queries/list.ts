import knex from "../../../helpers/init-db"

import { IAppContext, ICard } from "../../../@types/graphql"

export const listCards = async (
  _parent: any,
  _args: any,
  context: IAppContext
): Promise<ICard[]> => {
  const cardReponse = await knex<ICard>("cards")
    .orderBy("iat", "desc")
    .where({ author: context.id })
    .select("*")

  return cardReponse
}
