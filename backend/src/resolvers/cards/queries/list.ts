import knex from "../../../helpers/init-db"

import { ICard } from "../../../@types/graphql"

export const listCards = async (): Promise<ICard[]> => {
  const cardReponse = await knex<ICard>("cards").select("*")

  return cardReponse
}
