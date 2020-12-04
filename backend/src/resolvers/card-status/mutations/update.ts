import knex from "../../../helpers/init-db"
import {
  IAppContext,
  ICard,
  IUpdateCardStatusParams,
  QueryStatus,
  QUERY_STATUS,
} from "../../../@types/graphql"

export const updateCardStatus = async (
  _: any,
  args: IUpdateCardStatusParams,
  context: IAppContext
): Promise<QueryStatus> => {
  try {
    await knex<ICard>("cards")
      .update({
        status: args.status,
      })
      .where({
        id: args.id,
        author: context.id,
      })

    return {
      status: QUERY_STATUS.SUCCESS,
      message: `Update status of card id: ${args.id} with status ${args.status} successfully.`,
    }
  } catch (error) {
    return {
      status: QUERY_STATUS.FAIL,
      message: `Fail to update status of card id: ${args.id} with status ${args.status}.`,
    }
  }
}
