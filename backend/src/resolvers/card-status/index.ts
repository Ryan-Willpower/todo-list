import { updateCardStatus } from "./mutations/update"

const cardResolvers = {
  Mutation: {
    updateCardStatus,
  },
}

export default cardResolvers
