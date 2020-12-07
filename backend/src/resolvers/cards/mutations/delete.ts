import knex from "../../../helpers/init-db"
import {
  IDeleteCardParams,
  IAppContext,
  QueryStatus,
  ICard,
  QUERY_STATUS,
} from "../../../@types/graphql"

export const deleteCard = async (
  _: any,
  args: IDeleteCardParams,
  context: IAppContext
): Promise<QueryStatus> => {
  try {
    await knex<ICard>("cards").del().where({
      id: args.id,
      author: context.id,
    })

    return {
      status: QUERY_STATUS.SUCCESS,
      message: "Delete card successfully",
    }
  } catch (error) {
    console.error(error)

    return {
      status: QUERY_STATUS.FAIL,
      message: `Fail to delete card id: ${args.id}, message: ${error.message}`,
    }
  }
}
