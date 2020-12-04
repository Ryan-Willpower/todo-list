import { listCards } from "./queries/list"

import { addCard } from "./mutations/add"
import { updateCard } from "./mutations/update"
import { deleteCard } from "./mutations/delete"

const cardResolvers = {
  Query: {
    listCards,
  },
  Mutation: {
    addCard,
    updateCard,
    deleteCard,
  },
}

export default cardResolvers
